import { mount } from "@vue/test-utils";
import BaseTable from "../../../components/UI/Form/BaseTable.vue";

describe("BaseTable.vue", () => {
    const defaultProps = {
        headers: ["Full Name", "Email"],
    };

    it("renders table headers", () => {
        const wrapper = mount(BaseTable, {
            props: defaultProps,
        });

        const ths = wrapper.findAll("th");
        expect(ths).toHaveLength(defaultProps.headers.length);

        defaultProps.headers.forEach((header, index) => {
            expect(ths[index].text()).toBe(header);
        });
    });

    it("renders slot content", () => {
        const wrapper = mount(BaseTable, {
            props: defaultProps,
            slots: {
                default:
                    "<tr><td>David Test</td><td>test@example.com</td></tr>",
            },
        });

        const tds = wrapper.findAll("td");
        expect(tds).toHaveLength(defaultProps.headers.length);
        expect(wrapper.text()).toContain("David Test");
        expect(wrapper.text()).toContain("test@example.com");
    });
});
