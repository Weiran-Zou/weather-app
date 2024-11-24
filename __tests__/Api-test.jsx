import fetchWeather from "../utils/api";
import { mockWeatherData } from "../__mocks__/MockWeatherData";

describe('fetchWeather function', () => {
  
  it('should return weather data on successful fetch', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockWeatherData)
      })
    await expect(fetchWeather()).resolves.toBe(mockWeatherData);
  })

  it('should return an error on failed fetch', async () => {
    global.fetch = jest.fn().mockRejectedValue(
      new Error("An error has occured")
    );
    await expect(fetchWeather()).rejects.toThrow("An error has occured")
  })
})