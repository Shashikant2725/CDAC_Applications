type AcceptOrder struct {
	Buyer string `json:"buyer"`
	Shipper string `json:"shipper"`
	AgreedDeliveryDate string `json:"agreedDeliveryDate"`
	OrderAccepted bool `json:"orderAccepted"`
	Type string `json:"type"`	
}
func (s *SmartContract) AcceptOrder(ctx contractapi.TransactionContextInterface, reqOrderId string, acceptOrderId string, buyer string, shipper string,
	agreedDeliveryDate string,orderAccepted string) error {

		orderAsBytes, err := ctx.GetStub().GetState(reqOrderId)
	if err != nil {
		return fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if orderAsBytes == nil {
		return fmt.Errorf("%s does not exist", reqOrderId)
	}
	details := new(RequestOrder)
	_ = json.Unmarshal(orderAsBytes, details)
	orderAccepted1, _ := strconv.ParseBool(orderAccepted)
	details.OrderAccepted = orderAccepted1;
	details.AgreedDeliveryDate=agreedDeliveryDate;
    Type:="acceptorder"

	detailsAsBytes, _ := json.Marshal(details)
	ctx.GetStub().PutState(reqOrderId, detailsAsBytes)
      	

		details1 :=AcceptOrder{
		Buyer:buyer,
		Shipper:shipper,
		AgreedDeliveryDate:agreedDeliveryDate,
		OrderAccepted:orderAccepted1,
		Type:Type,
	}


	detailsAsBytes1, _ := json.Marshal(details1)

	return ctx.GetStub().PutState(acceptOrderId, detailsAsBytes1)
}

