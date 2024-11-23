import { getUnit } from "../utils/Helpers.jsx";

describe('getUnit function', () => {

    it('should return % for clouds', () => {
        expect(getUnit('clouds')).toBe('%');
    });
    it('should return "\u00b0C" for dew_point', () => {
        expect(getUnit('dew_point')).toBe('\u00b0C');
    });
    it('should return % for humidity', () => {
        expect(getUnit('humidity')).toBe('%');
    });
    it('should return hPa for pressure', () => {
        expect(getUnit('pressure')).toBe('hPa');
    });
    it('should return "" for uvi', () => {
        expect(getUnit('uvi')).toBe("");
    });
    it('should return m for visibility', () => {
        expect(getUnit('visibility')).toBe('m');
    });
    it('should return m/s for wind speed', () => {
        expect(getUnit('wind_speed')).toBe('m/s');
    });
    it('should return undefined for invalid input', () => {
        expect(getUnit('invalid_input')).toBe(undefined);
    });
})
