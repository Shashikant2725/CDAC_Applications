type FragileGoods struct {
	FragileGoodsId string `json:"fragileGoodsId"`
	AccelerationMin int `json:"accelerationMin"`
	AccelerationMax int `json:"accelerationMax"`
	AccelerometerReadings string `json:"accelerometerReadings"`
	AccelerationBreachPenalty float64 `json:"accelerationBreachPenalty"`
	CostofGoods float64 `json:"costofGoods"`
	Numberofshocks float64 `json:"numberofshocks"`
	TotalPenalty float64 `json:"totalPenalty"`
	PayableAmount float64 `json:"payableAmount"`
	Type string `json:"Type"`
	}
	
	
func (s *SmartContract) FragileGoods(ctx contractapi.TransactionContextInterface, reqOrderId string, FragileGoodsId string, accMin string,accMax string,
		accelerometerReadings string,accelerationbreachPenalty string) error {

   
        var shocks float64;
        var totalPenalty float64;
        var payableAmount float64;
		accelerationMin,_:=strconv.Atoi(accMin)
		accelerationMax,_:=strconv.Atoi(accMax)
		accelerationBreachPenalty,_:=strconv.ParseFloat(accelerationbreachPenalty, 8)
        // var result=accelerometerReadings.split(" ");
		result := strings.Fields(accelerometerReadings)
		res := []int{} 
		for a:=0; a < len(result); a++ {
			value,_:=strconv.Atoi(result[a])
			res = append(res, value)
        }
	for _, val := range res {
        if(val>accelerationMax || val<accelerationMin){
            shocks++
		}
    }
    
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
    totalPenalty =shocks*accelerationBreachPenalty;
    payableAmount=costofGoods-totalPenalty;
    order.FragilePenalty=totalPenalty;
    order.Amount_after_fragilePenalty=payableAmount;
    order.TotalAmountPayable=payableAmount;
 	var Type="fragilegoods";
 	detailsAsBytes, _ := json.Marshal(order)
	ctx.GetStub().PutState(reqOrderId, detailsAsBytes)	

    details := FragileGoods {
        FragileGoodsId:FragileGoodsId,
        AccelerationMin:accelerationMin,
        AccelerationMax:accelerationMax,
        AccelerometerReadings:accelerometerReadings,
        AccelerationBreachPenalty:accelerationBreachPenalty,
        CostofGoods:costofGoods,
        Numberofshocks:shocks,
        TotalPenalty:totalPenalty,
        PayableAmount:payableAmount,
        Type:Type,
    };
	details1, _ := json.Marshal(details)

	return ctx.GetStub().PutState(FragileGoodsId, details1)
   
}

