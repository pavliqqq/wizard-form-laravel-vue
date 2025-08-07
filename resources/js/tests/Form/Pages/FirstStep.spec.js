import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import FirstStep from "../../../components/Form/Pages/FirstStep.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";
import PhoneInput from "../../../components/UI/Form/CountryPhoneInput.vue";
import BirthdateInput from "../../../components/UI/Form/BirthdateInput.vue";
import * as caseConverter from "../../../helpers/caseConverter";
import axios from "axios";

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: () => Promise.resolve("US"),
    json: () => Promise.resolve({ country: "US" }),
});

const mockUpdate = jest.fn().mockResolvedValue({
    data: {},
});

jest.mock("axios");

describe("FirstStep.vue", () => {
    const defaultGlobal = {
        stubs: {
            BaseInput: true,
            PhoneInput: true,
            BirthdateInput: true,
        },
    };
    const defaultProps = {
        update: mockUpdate,
        errors: {},
    };

    const saved = {
        firstName: "Peter",
        lastName: "Parker",
        birthdate: "1980-01-01",
        reportSubject: "Spiders",
        country: "UA",
        phone: "380996663300",
        email: "test@example.com",
    };

    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());
        jest.clearAllMocks();
        localStorage.clear();

        axios.get.mockResolvedValue({
            data: {
                countries: [{ code: "US" }, { code: "UA" }],
            },
        });

        wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });
    });

    it("renders first step of form", async () => {
        const components = [BaseInput, PhoneInput, BirthdateInput];
        components.forEach((component) => {
            const found = wrapper.findAllComponents(component);
            expect(found.length).toBeGreaterThan(0);
        });

        const button = wrapper.find('[data-testid="nextButton"]');
        expect(button.exists()).toBe(true);
    });

    it("stores data in localStorage", async () => {
        localStorage.setItem("firstStep", JSON.stringify(saved));

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        expect(wrapper.vm.Data).toEqual(saved);
    });

    it("creates member", async () => {
        const returnedId = "11";
        const returnedEmail = "email@test.com";
        axios.post.mockResolvedValue({
            data: {
                id: returnedId,
                email: returnedEmail,
            },
        });

        const snakeData = {
            first_name: "Peter",
            last_name: "Parker",
            birthdate: "1980-01-01",
            report_subject: "Spiders",
            country: "UA",
            phone: "380996663300",
            email: "test@example.com",
        };

        jest.spyOn(caseConverter, "camelToSnakeObj").mockReturnValue(snakeData);

        await wrapper.vm.createMemberService.createMember();

        expect(caseConverter.camelToSnakeObj).toHaveBeenCalledWith(wrapper.vm.Data);
        expect(axios.post).toHaveBeenCalledWith("/api/members", snakeData);
        expect(localStorage.getItem("id")).toBe(returnedId);
        expect(localStorage.getItem("email")).toBe(returnedEmail);
        expect(wrapper.emitted("next")).toBeTruthy();
    });

    it("updates member", async () => {
        const id = "11";
        localStorage.setItem("id", id);
        localStorage.setItem("firstStep", JSON.stringify(saved));

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        localStorage.getItem("id");

        const data = {
            ...wrapper.vm.Data,
            id: id,
        };

        await wrapper.vm.updateMemberService.updateMember();

        expect(wrapper.vm.memberId).toBe(id);
        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(wrapper.emitted("next")).toBeTruthy();
    });

    it("chooses action: create member", async () => {
        const email = "email@test.com";
        localStorage.setItem("email", email);

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const mockCreateMember = jest
            .spyOn(wrapper.vm.createMemberService, "createMember")
            .mockImplementation(() => {});

        localStorage.getItem("email");

        wrapper.vm.action();

        expect(wrapper.vm.originalEmail).toBe(email);
        expect(wrapper.vm.Data.email).toBe("");
        expect(wrapper.vm.originalEmail).not.toBe(wrapper.vm.Data.email);
        expect(mockCreateMember).toHaveBeenCalled();
    });

    it("choses action: update member", async () => {
        const email = "email@test.com";
        localStorage.setItem("email", email);

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const mockUpdateMember = jest
            .spyOn(wrapper.vm.updateMemberService, "updateMember")
            .mockImplementation(() => {});

        wrapper.vm.Data.email = email;
        localStorage.getItem("email");

        wrapper.vm.action();

        expect(wrapper.vm.originalEmail).toBe(email);
        expect(wrapper.vm.Data.email).toBe(email);
        expect(wrapper.vm.originalEmail).toBe(wrapper.vm.Data.email);
        expect(mockUpdateMember).toHaveBeenCalled();
    });
});
