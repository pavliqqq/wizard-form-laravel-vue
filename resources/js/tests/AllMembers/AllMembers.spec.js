import { flushPromises, mount } from "@vue/test-utils";
import AllMembers from "../../components/AllMembers/AllMembers.vue";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import {renderComponentsCheck} from "../helpers/renderHelpers.js";
import {nextTick} from "vue";
import {mockFormData} from "../helpers/mockHelpers.js";

const mockClearErrors = jest.fn();
const mockShowErrors = jest.fn();

let mockIsAdmin = false;

jest.mock("axios");

jest.mock("../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        clearErrors: mockClearErrors,
        showErrors: mockShowErrors
    }),
}));

jest.mock("../../stores/adminStore.js", () => ({
    useAdminStore: () => ({
        isAdmin: mockIsAdmin,
    }),
}));

describe("Members table", () => {
    const defaultGlobal = {
        global: {
            stubs: {
                MemberRow: true,
                MemberRowEdit: true,
                FileInput: true,
            },
        },
    };

    const member = {
        id: 1,
        full_name: "Pavel Tiutiunnyk",
        report_subject: "Test subject",
        email: "pavel@example.com",
        photo: "test.jpg",
        visibility: true,
    };

    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());
        jest.clearAllMocks();

        axios.get.mockResolvedValue({ data: { members: [] } });
        wrapper = mount(AllMembers, defaultGlobal);
    });

    it("renders members table", async () => {
        wrapper.vm.members = [member];

        await nextTick();

        const components = ['membersTable', 'memberRow'];
        renderComponentsCheck(components, wrapper);
    });

    it("excludes feature columns when user is not admin", async () => {
        const adminFeatures = ["Edit", "Delete", "Visible"];

        adminFeatures.forEach((feature) => {
            expect(wrapper.vm.tableHeaders).not.toContain(feature);
        });
    });

    it("includes feature columns when user is admin", async () => {
        mockIsAdmin = true;
        const wrapper = mount(AllMembers, defaultGlobal);

        const adminFeatures = ["Edit", "Delete", "Visible"];

        adminFeatures.forEach((feature) => {
            expect(wrapper.vm.tableHeaders).toContain(feature);
        });
    });

    it("renders members table with editable row for member", async () => {
        wrapper.vm.members = [member];
        wrapper.vm.editMemberId = member.id;

        await nextTick();

        const components = ['membersTable', 'memberRowEdit'];
        renderComponentsCheck(components, wrapper);
    });

    it("resets photo selection and preview", async () => {
        global.URL.createObjectURL = jest.fn();
        global.URL.revokeObjectURL = jest.fn();

        wrapper.vm.editPhoto = "editPhotoTest.jpg";

        wrapper.vm.editPhotoPreview = "editPhotoPreviewTest.jpg";

        wrapper.vm.photoService.resetPhoto();

        expect(wrapper.vm.editPhoto).toBe(null);
        expect(wrapper.vm.editPhotoPreview).toBe(null);
    });

    it("prepares the form for editing selected member", async () => {
        const resetPhotoMock = jest
            .spyOn(wrapper.vm.photoService, "resetPhoto")
            .mockImplementation(() => {});

        wrapper.vm.changeMember(member);

        expect(wrapper.vm.editMemberId).toBe(member.id);

        const expectedForm = {
            fullName: member.full_name,
            reportSubject: member.report_subject,
            email: member.email,
        };

        expect(wrapper.vm.editForm).toEqual(expectedForm);
        expect(resetPhotoMock).toHaveBeenCalled();
        expect(mockClearErrors).toHaveBeenCalled();
    });

    const cases = [
        {
            testName: "shows all members for admin user",
            isAdmin: true,
            expectedUrl: "/api/members",
        },
        {
            testName: "shows only visible members for non-admin user",
            isAdmin: false,
            expectedUrl: "/api/members?filter[visibility]=true",
        },
    ];
    cases.forEach(({ testName, isAdmin, expectedUrl }) => {
        it(testName, async () => {
            mockIsAdmin = isAdmin;

            axios.get.mockResolvedValue({
                data: {
                    members: [member],
                },
            });

            const wrapper = mount(AllMembers, defaultGlobal);

            await flushPromises();

            expect(axios.get).toHaveBeenCalledWith(expectedUrl);
            expect(wrapper.vm.members).toEqual([member]);
        });
    });

    const errorCases = [
        {
            testName: "does not show members for admin user if request fails",
            isAdmin: true,
            expectedUrl: "/api/members",
        },
        {
            testName: "does not show members for non-admin user if request fails",
            isAdmin: false,
            expectedUrl: "/api/members?filter[visibility]=true",
        },
    ];
    errorCases.forEach(({ testName, isAdmin, expectedUrl }) => {
        it(testName, async () => {
            jest.spyOn(console, "error").mockImplementation(() => {});

            mockIsAdmin = isAdmin;

            axios.get.mockRejectedValue(new Error("Network error"));

            const wrapper = mount(AllMembers, defaultGlobal);

            await flushPromises();

            expect(axios.get).toHaveBeenCalledWith(expectedUrl);
            expect(wrapper.vm.members).toEqual([]);
        })
    });

    it("updates member and refreshes the members list", async () => {
        const getMembersMock = jest.spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        const resetPhotoMock = jest.spyOn(wrapper.vm.photoService, "resetPhoto")
            .mockImplementation(() => {});

        const file = new File([new Uint8Array(300 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        wrapper.vm.editForm = {
            fullName: "Peter Parker",
            reportSubject: "Spiders",
            email: "peterparker@gmail.com",
        };

        wrapper.vm.editPhoto = file;

        const { mockAppend, fakeForm, formDataSpy } = mockFormData(jest);

        axios.post.mockResolvedValue({});

        const memberId = 7;
        await wrapper.vm.updateMember(memberId);

        await flushPromises();

        expect(formDataSpy).toHaveBeenCalledWith({
            full_name: wrapper.vm.editForm.fullName,
            reportSubject: wrapper.vm.editForm.reportSubject,
            email: wrapper.vm.editForm.email,
            photo: wrapper.vm.editPhoto,
        });
        expect(mockAppend).toHaveBeenCalledWith("_method", "patch");
        expect(axios.post).toHaveBeenCalledWith(`api/admin/members/${memberId}`, fakeForm);
        expect(wrapper.vm.editMemberId).toBe(null);
        expect(resetPhotoMock).toHaveBeenCalled();
        expect(getMembersMock).toHaveBeenCalled();
    });

    it('does not update member and shows errors if updating member fails', async () => {
        const getMembersMock = jest.spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        const resetPhotoMock = jest.spyOn(wrapper.vm.photoService, "resetPhoto")
            .mockImplementation(() => {});

        const errors = {
            email: ["Email is required"],
        };

        axios.post.mockRejectedValue({
            response: { status: 422, data: { errors } },
        });

        const { fakeForm } = mockFormData(jest);

        const memberId = 7;
        await wrapper.vm.updateMember(memberId);

        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith(`api/admin/members/${memberId}`, fakeForm);
        expect(resetPhotoMock).not.toHaveBeenCalled();
        expect(getMembersMock).not.toHaveBeenCalled();
        expect(mockShowErrors).toHaveBeenCalledWith(errors);
    })

    it("changes member visibility", async () => {
        const visibilityBefore = member.visibility;
        axios.post.mockResolvedValue({
            data: { visibility: !visibilityBefore },
        });

        await wrapper.vm.toggleVisibility(member);

        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith(`api/admin/members/toggle/${member.id}`, null);
        expect(member.visibility).not.toBe(visibilityBefore);
    });

    it("does not change member visibility if request fails", async() => {
        jest.spyOn(console, "error").mockImplementation(() => {});

        const visibilityBefore = member.visibility;

        axios.post.mockRejectedValue(new Error("Network error"));

        await wrapper.vm.toggleVisibility(member);

        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith(`api/admin/members/toggle/${member.id}`, null);
        expect(member.visibility).toBe(visibilityBefore);
    })

    it("deletes member and refreshes the members list", async () => {
        const getMembersMock = jest
            .spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        axios.delete.mockResolvedValue();

        const memberId = 7;
        await wrapper.vm.deleteMember(memberId);

        await flushPromises();

        expect(axios.delete).toHaveBeenCalledWith(`api/admin/members/${memberId}`);
        expect(getMembersMock).toHaveBeenCalled();
    });

    it("does not remove member if request fails", async() => {
        jest.spyOn(console, "error").mockImplementation(() => {});

        const getMembersMock = jest
            .spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        axios.delete.mockRejectedValue(new Error("Network error"));

        const memberId = 7;
        await wrapper.vm.deleteMember(memberId);

        await flushPromises();

        expect(axios.delete).toHaveBeenCalledWith(`api/admin/members/${memberId}`);
        expect(getMembersMock).not.toHaveBeenCalled();
    })
});
