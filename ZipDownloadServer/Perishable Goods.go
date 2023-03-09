type PerishableGoods struct {
	PerishableGoodsId string `json:"perishableGoodsId"`
	AgreedDeliveryDate  string `json:"agreedDeliveryDate"`
	ActualDeliveryDate string `json:"actualDeliveryDate"`
	MinTemperature int `json:"minTemperature"`
	MaxTemperature int `json:"maxTemperature"`
	MinHumidity int `json:"minHumidity"`
	MaxHumidity int `json:"maxHumidity"`
	PenaltyFactor float64 `json:"penaltyFactor"`
	TempSensorReading string `json:"tempSensorReading"`
	HumSensorReading string `json:"humSensorReading"`
	CostofGoods float64 `json:"costofGoods"`
	Amount_to_be_paid float64 `json:"amount_to_be_paid"`
	Total_penalty float64 `json:"total_penalty"`
	ContractTerminated bool `json:"contractTerminated"`
	Temperature_penalty float64 `json:"temperature_penalty"`
	Humidity_penalty float64 `json:"humidity_penalty"`
	Type string `json:"Type"`
	}
	func (s *SmartContract) PerishableGoods(ctx contractapi.TransactionContextInterface, reqOrderId string, PerishableGoodsId string, minTemp string,maxTemp string,
	minHum string,maxHum string,penaltyfactor string,tempSensorReading string,humSensorReading string) error {

		orderAsBytes, err := ctx.GetStub().GetState(reqOrderId)
		if err != nil {
			return fmt.Errorf("Failed to read from world state. %s", err.Error())
		}
	
		if orderAsBytes == nil {
			return fmt.Errorf("%s does not exist", reqOrderId)
		}
		order := new(RequestOrder)
		_ = json.Unmarshal(orderAsBytes, order);
		var agreedDeliveryDate1=order.AgreedDeliveryDate;
		var actualDeliveryDate1=order.ActualDeliveryDate;
		var totalAmountPayable1=order.TotalAmountPayable;

		date1, _ := time.Parse("2006-01-02", agreedDeliveryDate1)
		 date2, _ := time.Parse("2006-01-02", actualDeliveryDate1)

var amount_to_be_paid float64;
var total_penalty float64;
var contractTerminated=false;
var temperature_penalty float64;
var humidity_penalty float64;

// Auxiliary function calculating penalty from temperature readings

CalculateTempPenalty := func(minTemperature int, maxTemperature int, penaltyFactor float64, tempSensorReading string) float64 {

var count float64;
result := strings.Fields(tempSensorReading)
		res := []int{} 
		for a:=0; a < len(result); a++ {
			value,_:=strconv.Atoi(result[a])
			res = append(res, value)
        }
	for _, val := range res {
        if(val>maxTemperature || val<minTemperature){
            count++
		}
    }
	count=count*penaltyFactor;
	return count;

}
// Auxiliary function calculating penalty from humidity readings
CalculateHumPenalty := func(minHumidity int,maxHumidity int,
	penaltyFactor float64,humSensorReading string) float64 { 
var count float64;
result := strings.Fields(humSensorReading)
		res := []int{} 
		for a:=0; a < len(result); a++ {
			value,_:=strconv.Atoi(result[a])
			res = append(res, value)
        }
	for _, val := range res {
        if(val>maxHumidity || val<minHumidity){
            count++
		}
    }
	count=count*penaltyFactor;
	return count;
}


	minTemperature,_:=strconv.Atoi(minTemp)
	maxTemperature,_:=strconv.Atoi(maxTemp)
	minHumidity,_:=strconv.Atoi(minHum)
	maxHumidity,_:=strconv.Atoi(maxHum)
	penaltyFactor,_:=strconv.ParseFloat(penaltyfactor,8)
var terminationDays1=order.TerminationDays;
// const diffTime = Math.abs(dueDate - date);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
// console.log("Delivered after "+diffDays+" days");
// if(diffDays>terminationDays1)
// {
// 	amount_to_be_paid=0;
// 	total_penalty=0;
// 	contractTerminated=true;
// }
// else{
	diff := date2.Sub(date1)
		diffDays:=float64(diff.Hours()/24)
		
			
		if(diffDays>terminationDays1){
			amount_to_be_paid=0;
			total_penalty=0;
			contractTerminated=true;
		}else {	
temperature_penalty=CalculateTempPenalty(minTemperature,maxTemperature,
penaltyFactor,tempSensorReading);
humidity_penalty=CalculateHumPenalty(minHumidity,maxHumidity,
penaltyFactor,humSensorReading);
total_penalty=temperature_penalty+humidity_penalty;
amount_to_be_paid=math.Max(totalAmountPayable1-total_penalty,0);

}
order.TotalAmountPayable=amount_to_be_paid;
order.PerishableGoodsPenalty=total_penalty;
order.ContractTerminated=contractTerminated;
order.Amount_after_perishablePenalty=amount_to_be_paid;
detailsAsBytes, _ := json.Marshal(order)
	ctx.GetStub().PutState(reqOrderId, detailsAsBytes)
var Type="perishablegoods";
details := PerishableGoods {
	PerishableGoodsId:PerishableGoodsId,
	AgreedDeliveryDate:agreedDeliveryDate1,
	ActualDeliveryDate:actualDeliveryDate1,
	MinTemperature:minTemperature,
	MaxTemperature: maxTemperature,
	MinHumidity: minHumidity,
	MaxHumidity: maxHumidity,
	PenaltyFactor:penaltyFactor,
	TempSensorReading:tempSensorReading,
	HumSensorReading:humSensorReading,
	CostofGoods:totalAmountPayable1,
	Amount_to_be_paid:amount_to_be_paid,
	Total_penalty:total_penalty,
	ContractTerminated:contractTerminated,
	Temperature_penalty:temperature_penalty,
	Humidity_penalty:humidity_penalty,
	Type:Type,
};
details1, _ := json.Marshal(details)

	return ctx.GetStub().PutState(PerishableGoodsId, details1)
}

