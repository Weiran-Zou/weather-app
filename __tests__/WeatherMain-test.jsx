import WeatherMain from "../components/weather/WeatherMain";
import { render, screen } from '@testing-library/react-native';

describe('WeatherMain component', () => {
    
    it("should render a place of Melbourne, a temperature of 35 °C and an img with src containing iconCode of 04d", () => {
        const {getByText, getByTestId} = render(<WeatherMain iconCode="04d" temperature={35.567} place="Melbourne"/>)
        expect(getByText("Melbourne"));
        expect(getByText("36 "));
        expect(getByText("°C"));
        expect(getByTestId("main-weather-icon", {src:"https://openweathermap.org/img/wn/$04d@2x.png"}))
    })
})