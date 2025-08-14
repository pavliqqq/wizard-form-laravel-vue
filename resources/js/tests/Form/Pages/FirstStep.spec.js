import {flushPromises, mount} from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import FirstStep from "../../../components/Form/Pages/FirstStep.vue";
import * as caseConverter from "../../../helpers/caseConverter";
import axios from "axios";
import {renderElementsCheck} from "../../helpers/renderHelpers.js";

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: () => Promise.resolve("US"),
    json: () => Promise.resolve({ country: "US" }),
});

const mockUpdate = jest.fn();
const mockShowErrors = jest.fn();

jest.mock('../../../stores/errorStore.js', () => ({
    useErrorStore: () => ({
        showErrors: mockShowErrors
    })
}))

jest.mock("axios");

describe("First step of main form", () => {
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

    const testData = {
        firstName: "Peter",
        lastName: "Parker",
        birthdate: "1980-01-01",
        reportSubject: "Spiders",
        country: "UA",
        phone: "380996663300",
        email: "test@example.com",
    };

    const snakeTestData = {
        first_name: "Peter",
        last_name: "Parker",
        birthdate: "1980-01-01",
        report_subject: "Spiders",
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
            data: { countries: [{ code: "US" }, { code: "UA" }] },
        });

        wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });
    });

    it("renders first step of form", async () => {
        const components = [
            'firstNameInput', 'lastNameInput', 'birthdateInput',
            'reportSubjectInput', 'phoneInput', 'emailInput'
        ];

        renderElementsCheck(components, wrapper);

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        expect(nextButton.exists()).toBe(true);
    });

    it("restores previously saved data from localStorage on mount", async () => {
        localStorage.setItem("firstStep", JSON.stringify(testData));

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        expect(wrapper.vm.Data).toEqual(testData);
    });

    it("creates member and proceeds to next step", async () => {
        const returnedId = "11";
        const returnedEmail = "email@test.com";
        axios.post.mockResolvedValue({
            data: {
                id: returnedId,
                email: returnedEmail,
            },
        });

        const caseConverterSpy = jest.spyOn(caseConverter, "camelToSnakeObj").mockReturnValue(snakeTestData);

        await wrapper.vm.createMemberService.createMember();

        expect(caseConverterSpy).toHaveBeenCalledWith(wrapper.vm.Data);
        expect(axios.post).toHaveBeenCalledWith("/api/members", snakeTestData);
        expect(localStorage.getItem("id")).toBe(returnedId);
        expect(localStorage.getItem("email")).toBe(returnedEmail);
        expect(wrapper.emitted("next")).toBeTruthy();
    });

    it("does not create member if creating request fails", async () => {
        const returnedId = "11";
        const returnedEmail = "email@test.com";

        const errors = {
            email: ["Email is required"],
        };

        axios.post.mockRejectedValue({
            response: { status: 422, data: { errors } },
        });

        const caseConverterSpy = jest.spyOn(caseConverter, "camelToSnakeObj").mockReturnValue(snakeTestData);

        await wrapper.vm.createMemberService.createMember();

        expect(caseConverterSpy).toHaveBeenCalledWith(wrapper.vm.Data);
        expect(axios.post).toHaveBeenCalledWith("/api/members", snakeTestData);
        expect(localStorage.getItem("id")).not.toBe(returnedId);
        expect(localStorage.getItem("email")).not.toBe(returnedEmail);
        expect(wrapper.emitted("next")).toBeFalsy();
        expect(mockShowErrors).toHaveBeenCalledWith(errors);
    })

    it("updates member and proceeds to next step", async () => {
        const id = "11";
        localStorage.setItem("id", id);
        localStorage.setItem("firstStep", JSON.stringify(testData));

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const data = {
            ...wrapper.vm.Data,
            id: id,
        };

        mockUpdate.mockResolvedValue({data: { success: true }});

        await wrapper.vm.updateMemberService.updateMember();

        expect(wrapper.vm.memberId).toBe(id);
        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(wrapper.emitted("next")).toBeTruthy();
    });

    it("does not update member if updating request fails", async () => {
        const id = "11";
        localStorage.setItem("id", id);
        localStorage.setItem("firstStep", JSON.stringify(testData));

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const data = {
            ...wrapper.vm.Data,
            id: id,
        };
        jest.spyOn(console, "error").mockImplementation(() => {});

        mockUpdate.mockRejectedValue(new Error("Network error"));

        await wrapper.vm.updateMemberService.updateMember();

        expect(wrapper.vm.memberId).toBe(id);
        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(wrapper.emitted("next")).toBeFalsy();
    })

    it("calls method to create member when email is not yet registered", async () => {
        const email = "email@test.com";
        localStorage.setItem("email", email);

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        await flushPromises();

        const mockCreateMember = jest.spyOn(wrapper.vm.createMemberService, "createMember")
            .mockImplementation(() => {});

        localStorage.getItem("email");

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        nextButton.trigger('click');

        expect(wrapper.vm.originalEmail).toBe(email);
        expect(wrapper.vm.Data.email).toBe("");
        expect(wrapper.vm.originalEmail).not.toBe(wrapper.vm.Data.email);
        expect(mockCreateMember).toHaveBeenCalled();
    });

    it("calls method to update member when email is already registered", async () => {
        const email = "email@test.com";
        localStorage.setItem("email", email);

        const wrapper = mount(FirstStep, {
            props: defaultProps,
            global: defaultGlobal,
        });

        await flushPromises();

        const mockUpdateMember = jest.spyOn(wrapper.vm.updateMemberService, "updateMember")
            .mockImplementation(() => {});

        wrapper.vm.Data.email = email;
        localStorage.getItem("email");

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        nextButton.trigger('click');

        expect(wrapper.vm.originalEmail).toBe(email);
        expect(wrapper.vm.Data.email).toBe(email);
        expect(wrapper.vm.originalEmail).toBe(wrapper.vm.Data.email);
        expect(mockUpdateMember).toHaveBeenCalled();
    });
});
