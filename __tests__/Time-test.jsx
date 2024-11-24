import { getDate, getTime, getDay } from "../utils/Time.jsx";

it("should return a string in HH:mm format for a given unix timestamp", () => {
  expect(getTime(1732356000)).toBe("21:00");
})

it("should return day of the month for a given unix timestamp", () => {
  expect(getDate(1732356000)).toBe(23);
})

describe("getDay function", () => {
  it("should return Sunday for Sunday timestamp", () => {
    expect(getDay(1732442400)).toBe("Sunday");
  })
  
  it("should return Monday for Monday timestamp", () => {
    expect(getDay(1732528800)).toBe("Monday");
  })
  
  it("should return Tuesday for Tuesday timestamp", () => {
    expect(getDay(1732615200)).toBe("Tuesday");
  })
  
  it("should return Wednsday for Wednsday timestamp", () => {
    expect(getDay(1732701600)).toBe("Wednsday");
  })
  
  it("should return Thursday for Thursday timestamp", () => {
    expect(getDay(1732788000)).toBe("Thursday");
  })

  it("should return Friday for Friday timestamp", () => {
    expect(getDay(1732874400)).toBe("Friday");
  })

  it("should return Saturday for Saturday timestamp", () => {
    expect(getDay(1732960800)).toBe("Saturday");
  })
    
})
    
   
