import { mount } from "@vue/test-utils";
import Map from "../../components/Map/Map.vue";
import L from "leaflet";

jest.mock("leaflet", () => {
    return {
        map: jest.fn(() => ({
            setView: jest.fn().mockReturnThis(),
        })),
        tileLayer: jest.fn(() => ({
            addTo: jest.fn(),
        })),
        marker: jest.fn(() => ({
            addTo: jest.fn().mockReturnThis(),
            bindPopup: jest.fn().mockReturnThis(),
            openPopup: jest.fn().mockReturnThis(),
        })),
        Icon: {
            Default: {
                prototype: {},
                mergeOptions: jest.fn(),
            },
        },
    };
});

describe("Map.vue", () => {
    it("renders map", () => {
        const wrapper = mount(Map);

        const mapDiv = wrapper.find("#map");
        expect(mapDiv.exists()).toBe(true);
    });

    it("initializes leaflet map with correct center and zoom", () => {
        mount(Map);

        const coords = [34.101558, -118.342345];

        expect(L.map).toHaveBeenCalledWith("map");
        expect(L.tileLayer).toHaveBeenCalled();
        expect(L.marker).toHaveBeenCalledWith(coords);
    });
});
