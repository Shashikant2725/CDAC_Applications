type RequestOrder struct {
	Buyer string `json:"buyer"`
	Shipper string `json:"shipper"`
	ReqOrderId string `json:"reqOrderId"`
	TypeofGoods string `json:"typeofGoods"`
	AgreedDeliveryDate string `json:"agreedDeliveryDate"`
	Type string `json:"type"`
	NumberofUnits float64 `json:"numberofUnits1"`
	UnitPrice float64 `json:"unitPrice1"`
	TerminationDays float64 `json:"terminationDays"`
	LateFee float64 `json:"lateFee"`
	CostofGoods float64 `json:"costofGoods"`
	TotalAmountPayable float64 `json:"totalAmountPayable"`
	OrderAccepted bool `json:"orderAccepted"`	
	Discount_Amount float64 `json:"discount_Amount"`
	Amount_after_Discount float64 `json:"amount_after_Discount"`
	DiscountRate float64 `json:"discountRate"`
	ActualDeliveryDate string `json:"ActualDeliveryDate"`
	Penalty_for_delay float64 `json:"penalty_for_delay"`
	Amount_after_lateDeliveryandPenalty float64 `json:"amount_after_lateDeliveryandPenalty"`
	DelayedDays float64 `json:"delayedDays"`
	ContractTerminated bool `json:"contractTerminated"`
	FragilePenalty float64 `json:"fragilePenalty"`
	Amount_after_fragilePenalty float64 `json:"amount_after_fragilePenalty"`
	PerishableGoodsPenalty float64 `json:"perishableGoodsPenalty"`
	Amount_after_perishablePenalty float64 `json:"amount_after_perishablePenalty"`
	FailureCompensation float64 `json:"failureCompensation"`
	Amount_after_purchaseOrderFailure float64 `json:"amount_after_purchaseOrderFailure"`
}

func (s *SmartContract) RequestOrder(ctx contractapi.TransactionContextInterface, reqOrderId string, buyer string, shipper string, typeofGoods string, 
	numberofUnits string, unitPrice string, agreedDeliveryDate string,terminationDays float64,lateFee float64) error {

	
      	orderAccepted := false
		unitPrice1, _ := strconv.ParseFloat(unitPrice,8)
		numberofUnits1, _ := strconv.ParseFloat(numberofUnits,8)
        costofGoods:=numberofUnits1*unitPrice1
        totalAmountPayable:=costofGoods
       	Type :="requestorder"

		details := RequestOrder{
		Buyer:buyer,
		Shipper:shipper,
		ReqOrderId:reqOrderId,
		TypeofGoods:typeofGoods,
		NumberofUnits:numberofUnits1,
		UnitPrice:unitPrice1,
		TerminationDays:terminationDays,
		AgreedDeliveryDate:agreedDeliveryDate,
		LateFee:lateFee,
		CostofGoods:costofGoods,
		OrderAccepted:orderAccepted,
		TotalAmountPayable:totalAmountPayable,
		Type:Type,
	}


	detailsAsBytes, _ := json.Marshal(details)

	return ctx.GetStub().PutState(reqOrderId, detailsAsBytes)
}


