let yearlyPriceClicked: boolean = false;


function resetYearlyCalculation(): void {
  yearlyPriceClicked = false;
}

export function calculateYearlyPrice(price: number): number {

  const result: number = price * 12
  if (yearlyPriceClicked) {

    return result
  }
  else {
    yearlyPriceClicked = true
    return price;
  }
}

export function calculateMonthlyPrice(price: number): number {
  resetYearlyCalculation()
  const result: number = price / 12

  if (result < price) {
    return price
  } else {
    return price * 12;
  }
}



