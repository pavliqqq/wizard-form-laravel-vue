import { flushPromises, mount } from "@vue/test-utils";
import AllMembers from "../../components/AllMembers/AllMembers.vue";
import BaseTable from "../../components/UI/Form/BaseTable.vue";
import MemberRow from "../../components/UI/Form/MemberRow.vue";
import MemberRowEdit from "../../components/UI/Form/MemberRowEdit.vue";
import { createPinia, setActivePinia } from "pinia";
import * as requestHelpers from "../../helpers/request";
import axios from "axios";

const mockClearErrors = jest.fn();
let mockIsAdmin = false;

jest.mock("axios");

jest.mock("../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        clearErrors: mockClearErrors,
    }),
}));

jest.mock("../../stores/adminStore.js", () => ({
    useAdminStore: () => ({
        isAdmin: mockIsAdmin,
    }),
}));

describe("AllMembers", () => {
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

    it("renders allMembers table", async () => {
        wrapper.vm.members = [member];

        await wrapper.vm.$nextTick();

        const components = [BaseTable, MemberRow];
        components.forEach((component) => {
            const found = wrapper.findAllComponents(component);
            expect(found.length).toBeGreaterThan(0);
        });
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

    it("renders MemberRowEdit for editing member", async () => {
        wrapper.vm.members = [member];
        wrapper.vm.editMemberId = member.id;

        await wrapper.vm.$nextTick();

        const components = [BaseTable, MemberRowEdit];
        components.forEach((component) => {
            const found = wrapper.findAllComponents(component);
            expect(found.length).toBeGreaterThan(0);
        });
    });

    it("resets editPhoto, editPhotoPreview", async () => {
        global.URL.createObjectURL = jest.fn();
        global.URL.revokeObjectURL = jest.fn();

        const editPhoto = "editPhotoTest.jpg";
        wrapper.vm.editPhoto = editPhoto;

        const editPhotoPreview = "editPhotoPreviewTest.jpg";
        wrapper.vm.editPhotoPreview = editPhotoPreview;

        expect(wrapper.vm.editPhoto).toBe(editPhoto);
        expect(wrapper.vm.editPhotoPreview).toBe(editPhotoPreview);

        wrapper.vm.photoService.resetPhoto();

        expect(wrapper.vm.editPhoto).toBe(null);
        expect(wrapper.vm.editPhotoPreview).toBe(null);
    });

    it("updates form value and clears errors when changeMember is called", async () => {
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
            testName: "gets all members when user is admin",
            isAdmin: true,
            expectedUrl: "/api/members",
        },
        {
            testName: "gets all members when user is not admin",
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

    it("updates member", async () => {
        const file = new File([new Uint8Array(300 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        const getMembersMock = jest
            .spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        const resetPhotoMock = jest
            .spyOn(wrapper.vm.photoService, "resetPhoto")
            .mockImplementation(() => {});

        wrapper.vm.editForm = {
            fullName: "Peter Parker",
            reportSubject: "Spiders",
            email: "peterparker@gmail.com",
        };

        wrapper.vm.editPhoto = file;

        const mockAppend = jest.fn();
        const fakeForm = { append: mockAppend };
        const formDataHelper = jest
            .spyOn(requestHelpers, "createFormData")
            .mockReturnValue(fakeForm);

        const memberId = 7;
        await wrapper.vm.updateMember(memberId);

        expect(formDataHelper).toHaveBeenCalledWith({
            full_name: wrapper.vm.editForm.fullName,
            reportSubject: wrapper.vm.editForm.reportSubject,
            email: wrapper.vm.editForm.email,
            photo: wrapper.vm.editPhoto,
        });
        expect(mockAppend).toHaveBeenCalledWith("_method", "patch");
        expect(axios.post.mock.calls[0]).toContain(
            `api/admin/members/${memberId}`,
        );
        expect(wrapper.vm.editMemberId).toBe(null);
        expect(resetPhotoMock).toHaveBeenCalled();
        expect(getMembersMock).toHaveBeenCalled();
    });

    it("toggles visibility of member", async () => {
        const visible = false;
        axios.post.mockResolvedValue({
            data: { visible },
        });

        await wrapper.vm.toggleVisibility(member);

        expect(axios.post).toHaveBeenCalledWith(
            `api/admin/members/toggle/${member.id}`,
            null,
        );
        expect(member.visibility).toBe(visible);
    });

    it("deletes member", async () => {
        const getMembersMock = jest
            .spyOn(wrapper.vm.getMembersService, "getMembers")
            .mockImplementation(() => {});

        const memberId = 7;
        await wrapper.vm.deleteMember(memberId);

        expect(axios.delete).toHaveBeenCalledWith(
            `api/admin/members/${memberId}`,
        );
        expect(getMembersMock).toHaveBeenCalled();
    });
});
