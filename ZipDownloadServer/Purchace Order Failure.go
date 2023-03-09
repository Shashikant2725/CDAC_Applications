type PurchaseOrderFailure struct {
	PurchaseOrderFailureId string `json:"purchaseOrderFailureId"`
	CostofGoods float64 `json:"costofGoods"`
	MaxFailures int `json:"maxFailures"`
	PreviousFailures int `json:"previousFailures"`
	AmountFailureCompensation float64 `json:"amountFailureCompensation"`
	PayableAmount float64 `json:"payableAmount"`
	Type string `json:"type"`
	}
	func (s *SmartContract) PurchaseOrderFailure(ctx contractapi.TransactionContextInterface, reqOrderId string, PurchaseOrderFailureId string, maxFailure string,
	previousFailure string,amountfailureCompensation string) error {

		orderAsBytes, err := ctx.GetStub().GetState(reqOrderId)
		if err != nil {
			return fmt.Errorf("Failed to read from world state. %s", err.Error())
		}
	
		if orderAsBytes == nil {
			return fmt.Errorf("%s does not exist", reqOrderId)
		}
		order := new(RequestOrder)
		_ = json.Unmarshal(orderAsBytes, order);
       var costofGoods=order.TotalAmountPayable;
            var payableAmount float64;
			amountFailureCompensation,_:=strconv.ParseFloat(amountfailureCompensation,8)
			maxFailures,_:=strconv.Atoi(maxFailure)
			previousFailures,_:=strconv.Atoi(previousFailure)
            if(previousFailures >maxFailures){
                payableAmount=costofGoods-amountFailureCompensation;
            }else {
                payableAmount=costofGoods;
                }
        order.TotalAmountPayable=payableAmount;
        order.FailureCompensation=amountFailureCompensation;
        order.Amount_after_purchaseOrderFailure=payableAmount;
		detailsAsBytes, _ := json.Marshal(order)
		ctx.GetStub().PutState(reqOrderId, detailsAsBytes)
        var Type="purchaseorderfailure"
		details := PurchaseOrderFailure{
        PurchaseOrderFailureId:PurchaseOrderFailureId,
        CostofGoods:costofGoods,
        MaxFailures:maxFailures,
        PreviousFailures: previousFailures,
        AmountFailureCompensation: amountFailureCompensation,
        PayableAmount:payableAmount,
        Type:Type,
    };
	details1, _ := json.Marshal(details)

	return ctx.GetStub().PutState(PurchaseOrderFailureId, details1)
    }
      
