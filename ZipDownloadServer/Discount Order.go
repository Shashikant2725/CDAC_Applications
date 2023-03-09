type Discount struct {
	DiscountId  string `json:"discountId"`
	Discount_Amount float64 `json:"discount_Amount"`
	Amount_after_Discount float64 `json:"amount_after_Discount"`
	DiscountRate float64 `json:"discountRate"`
	FirstVolume float64 `json:"firstVolume"`
	SecondVolume float64 `json:"secondVolume"`
	FirstRate float64 `json:"firstRate"`
	SecondRate float64 `json:"secondRate"`
	ThirdRate float64 `json:"thirdRate"`
	CostofGoods float64 `json:"costofGoods"`
	Type string `json:"type"`
	}
	
	
func (s *SmartContract) Discount(ctx contractapi.TransactionContextInterface, reqOrderId string, discountId string, firstvolume string, secondvolume string,
		firstrate string,secondrate string,thirdrate string) error {

	orderAsBytes, err := ctx.GetStub().GetState(reqOrderId)
    if err != nil {
		return fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if orderAsBytes == nil {
		return fmt.Errorf("%s does not exist", reqOrderId)
	}
	firstVolume, _ := strconv.ParseFloat(firstvolume, 8)
	secondVolume, _ := strconv.ParseFloat(secondvolume, 8)
	firstRate, _ := strconv.ParseFloat(firstrate, 8)
	secondRate, _ := strconv.ParseFloat(secondrate, 8)
	thirdRate, _ := strconv.ParseFloat(thirdrate, 8)
    order := new(RequestOrder)
	_ = json.Unmarshal(orderAsBytes, order)

     var costofGoods1 float64=order.TotalAmountPayable 

      var discountRate1 float64
      var discount_amount float64
      var amount_after_discount float64
    if(costofGoods1>=firstVolume){
        discount_amount=costofGoods1*(firstRate*0.01);
        amount_after_discount=costofGoods1*(1-firstRate*0.01);
        discountRate1=firstRate;
    } else
    if(costofGoods1>=secondVolume){
        
        discount_amount=costofGoods1*(secondRate*0.01);
        amount_after_discount=costofGoods1*(1-secondRate*0.01);
        discountRate1=secondRate;
    } else
	{
    discount_amount=costofGoods1*(thirdRate*0.01);
    amount_after_discount=costofGoods1*(1-thirdRate*0.01);
    discountRate1=thirdRate;
    }

        order.Discount_Amount=discount_amount;
        order.Amount_after_Discount=amount_after_discount;
        order.DiscountRate=discountRate1;
        order.TotalAmountPayable=amount_after_discount;
        Type:="discount";

		detailsAsBytes, _ := json.Marshal(order)
	ctx.GetStub().PutState(reqOrderId, detailsAsBytes)

    details := Discount{
        DiscountId:discountId,
        CostofGoods:costofGoods1,
        FirstVolume:firstVolume,
        SecondVolume:secondVolume,
        FirstRate:firstRate,
        SecondRate:secondRate,
        ThirdRate:thirdRate,
        DiscountRate:discountRate1,
        Discount_Amount:discount_amount,
        Amount_after_Discount:amount_after_discount,
        Type:Type,
    }
	details1, _ := json.Marshal(details)

	return ctx.GetStub().PutState(discountId, details1)

    }
