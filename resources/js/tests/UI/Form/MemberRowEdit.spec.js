import {mount} from "@vue/test-utils";
import MemberRowEdit from "../../../components/UI/Form/MemberRowEdit.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";
import FileInput from "../../../components/UI/Form/FileInput.vue";

describe("MemberRowEdit component", () => {
    const defaultProps = {
        memberId: 10,
        memberPhoto: "photo/test.jpg",
        photo: null,
        photoPreview: null,
        fullName: "David Test",
        reportSubject: "Test subject",
        email: "test@example.com",
        errors: {},
    };

    const defaultGlobal = {
        stubs: {
            BaseInput: true,
            FileInput: true,
        },
    };
    let wrapper;
    beforeEach(() => {
        wrapper = mount(MemberRowEdit, {
            props: defaultProps,
            global: defaultGlobal,
        });
    })

    it("renders all inputs and buttons for editing", async () => {
        const baseInputs = wrapper.findAllComponents(BaseInput);

        const modelValues = baseInputs.map((input) => input.props("modelValue"));

        expect(modelValues).toContain(defaultProps.fullName);
        expect(modelValues).toContain(defaultProps.reportSubject);
        expect(modelValues).toContain(defaultProps.email);

        const fileInput = wrapper.findComponent(FileInput);
        expect(fileInput.props("modelValue")).toBe(defaultProps.photo);

        const updateButton = wrapper.find('[data-testid="updateButton"]');
        expect(updateButton.exists()).toBe(true);

        const cancelButton = wrapper.find('[data-testid="cancelButton"]');
        expect(cancelButton.exists()).toBe(true);
    });

    it("renders photo with photo preview if it provided", () => {
        const photoPreview = "photoPreview.jpg";

        const wrapper = mount(MemberRowEdit, {
            props: {
                ...defaultProps,
                photoPreview,
            },
            global: defaultGlobal,
        });

        const img = wrapper.find('[data-testid="photo-img"]');
        expect(img.attributes("src")).toBe(photoPreview);
    });

    it("updates field when user selects file", async () => {
        const file = new File([new Uint8Array(300 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        const fileInput = wrapper.findComponent(FileInput);
        expect(fileInput.exists()).toBe(true);

        await fileInput.vm.$emit("update:modelValue", file);

        expect(wrapper.emitted("update:photo")).toBeTruthy();
    });

    it("updates member with member id when update button is clicked", async () => {
        const updateButton = wrapper.find('[data-testid="updateButton"]');
        expect(updateButton.exists()).toBe(true);

        await updateButton.trigger("click");

        expect(wrapper.emitted("update")).toBeTruthy();
        expect(wrapper.emitted("update")[0]).toEqual([defaultProps.memberId]);
    });
});
