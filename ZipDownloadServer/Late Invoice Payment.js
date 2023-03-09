    async  LateInvoicePayment(ctx,requestOrderId,LateInvoicePaymentId,invoiceReceivedDate,maxDelay,lateFee,interestStartsAfter,lateInterestRate) {
        try {
                const orderAsBytes = await ctx.stub.getState(requestOrderId); 
                if (!orderAsBytes || orderAsBytes.length === 0) {
                throw new Error(`${requestOrderId} does not exist`);
                  }
                 const order = JSON.parse(orderAsBytes.toString());
                 let invoiceDueDate=order.actualDeliveryDate;
                let invoiceAmountDue=order.totalAmountPayable;

            const invoiceReceivedDate2 = new Date(invoiceReceivedDate);
            const invoiceDueDate2 = new Date(invoiceDueDate);
            const difftime = Math.abs(invoiceReceivedDate2 - invoiceDueDate2);
            const diffDay = Math.round(difftime / (1000 * 60 * 60 * 24));
            let lateAmount=0;
            let lateInterestRateAmount=0;
            let totalPenalty=0;
            let totalAmount=0;
            if (invoiceDueDate2 < invoiceReceivedDate2) {
                if (diffDay > maxDelay) {
                    if (diffDay <= interestStartsAfter) {
                      lateAmount = lateFee * (diffDay - maxDelay);
                     totalAmount=lateAmount + parseInt(invoiceAmountDue);
                    } else if (diffDay >= interestStartsAfter) {
                        const diffTerm = Math.abs(diffDay - interestStartsAfter);
                        lateInterestRateAmount = ((lateInterestRate / 100) * invoiceAmountDue * diffTerm);
                        lateAmount=lateFee * (diffDay - maxDelay);
                        totalPenalty = parseInt(lateInterestRateAmount  + lateAmount);
                        totalAmount=totalPenalty+parseInt(invoiceAmountDue);
                    }
                } else if (diffDay <= maxDelay) {
                    totalAmount=invoiceAmountDue;
                }
            } else if (invoiceDueDate2 > invoiceReceivedDate2) {
                totalAmount=invoiceAmountDue;
            }
            order.totalAmountPayable=totalAmount;
            order.total_latePayment_Penalty=totalPenalty;
            await ctx.stub.putState(requestOrderId, Buffer.from(JSON.stringify(order)));
            const details = {
                "LateInvoicePaymentId":LateInvoicePaymentId,
                "invoiceAmountDue":invoiceAmountDue,
                "invoiceDueDate":invoiceDueDate,
                "invoiceReceivedDate":invoiceReceivedDate,
                "maxDelay":maxDelay,
                "lateFee":lateFee,
                "interestStartsAfter": interestStartsAfter,
                "lateInterestRate": lateInterestRate,
                "lateAmount":lateAmount,
                "lateInterestRateAmount":lateInterestRateAmount,
                "totalPenalty":totalPenalty,
                "totalAmount":totalAmount,

            };
            await ctx.stub.putState(LateInvoicePaymentId, Buffer.from(JSON.stringify(details)));
        
            return details;
    
        } catch (error) {
            console.log(error);
        }
    }

