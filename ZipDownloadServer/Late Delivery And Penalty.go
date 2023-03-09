type LateDeliveryandPenalty struct {
	AgreedDeliveryDate string `json:"agreedDeliveryDate"`
	TerminationDays float64 `json:"terminationDays"`
	LateFee float64 `json:"lateFee"`
	CostofGoods float64 `json:"costofGoods"`
	LateDeliveryPenalty float64 `json:"lateDeliveryPenalty"`
	DiffDays float64 `json:"diffDays"`
	ContractTerminated bool `json:"contractTerminated"`
	LateDeliveryandPenaltyId string `json:"lateDeliveryandPenaltyId"`
	ActualDeliveryDate string `json:"actualDeliveryDate"`
	Amount_to_be_paid  float64 `json:"amount_to_be_paid"`
	Type string `json:"type"`
	}
func (s *SmartContract) LateDeliveryandPenalty(ctx contractapi.TransactionContextInterface, reqOrderId string, lateDeliveryandPenaltyId string, actualDeliveryDate string) error {
	
	{
		orderAsBytes, err := ctx.GetStub().GetState(reqOrderId)
    if err != nil {
		return fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if orderAsBytes == nil {
		return fmt.Errorf("%s does not exist", reqOrderId)
	}
    order := new(RequestOrder)
	_ = json.Unmarshal(orderAsBytes, order)
		 var agreedDeliveryDate1=order.AgreedDeliveryDate;
		 var terminationDays1 =order.TerminationDays;
		 var lateFee1=order.LateFee;
		 var costofgoods=order.TotalAmountPayable;
	
		 var contractTerminated bool
		 var penalty_for_seller float64;
		 var amount_to_be_paid float64;
		
		 date1, error := time.Parse("2006-01-02", actualDeliveryDate)
		 date2, error := time.Parse("2006-01-02", agreedDeliveryDate1)
		 if error != nil {
			 fmt.Println(error)
		 }

		
		if(date2.After(date1)){
			return fmt.Errorf("Cannot exercise late delivery before delivery date");
		}
		diff := date1.Sub(date2)
		diffDays:=float64(diff.Hours()/24)
		 var penalty = diffDays*lateFee1;
			
		if(diffDays>terminationDays1){
			contractTerminated=true;
		}else {	
	
			penalty_for_seller=penalty;
			amount_to_be_paid=costofgoods-penalty;
		}
		order.ContractTerminated=contractTerminated;
		order.TotalAmountPayable=amount_to_be_paid;
		order.DelayedDays=diffDays;
		order.Penalty_for_delay=penalty_for_seller;
		order.Amount_after_lateDeliveryandPenalty=amount_to_be_paid;
		order.ActualDeliveryDate=actualDeliveryDate;
		var Type="latedeliveryandpenalty";
		detailsAsBytes, _ := json.Marshal(order)
		ctx.GetStub().PutState(reqOrderId, detailsAsBytes)

		details := LateDeliveryandPenalty{
			LateDeliveryandPenaltyId:lateDeliveryandPenaltyId,
			CostofGoods:costofgoods,
			TerminationDays:terminationDays1,
			AgreedDeliveryDate:agreedDeliveryDate1,
			ActualDeliveryDate:actualDeliveryDate,
			ContractTerminated: contractTerminated,
			LateDeliveryPenalty: penalty_for_seller,
			Amount_to_be_paid: amount_to_be_paid,
			DiffDays:diffDays,
			LateFee:lateFee1,
			Type:Type,
		};
		details1, _ := json.Marshal(details)

		return ctx.GetStub().PutState(lateDeliveryandPenaltyId, details1)
		}
		
	}


