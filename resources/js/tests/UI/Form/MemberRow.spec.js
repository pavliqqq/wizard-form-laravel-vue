import { mount } from "@vue/test-utils";
import MemberRow from "../../../components/UI/Form/MemberRow.vue";

describe("MemberRow component", () => {
    const defaultProps = {
        member: {
            id: 1,
            photo: "photo/test.jpg",
            full_name: "David Test",
            report_subject: "Test Subject",
            email: "test@example.com",
            visibility: true,
        },
        isAdmin: false,
    };

    let wrapper;
    beforeEach(() => {
        wrapper = mount(MemberRow, {
            props: defaultProps,
        });
    })

    it("renders correct elements", () => {
        const member = defaultProps.member;

        expect(wrapper.html()).toContain(member.full_name);
        expect(wrapper.html()).toContain(member.report_subject);
        expect(wrapper.html()).toContain(member.email);

        const img = wrapper.find('[data-testid="photo-img"]');

        expect(wrapper.exists()).toBe(true);
        expect(img.attributes("src")).toContain(member.photo);
    });

    it("renders correct email link", () => {
        const link = wrapper.find('[data-testid="email-link"]');

        expect(link.exists()).toBe(true);
        expect(link.attributes("href")).toBe(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${defaultProps.member.email}`,
        );
    });

    it("renders admin buttons when user is admin", () => {
        const wrapper = mount(MemberRow, {
            props: {
                ...defaultProps,
                isAdmin: true,
            },
        });

        expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="toggleVisibility-button"]').exists()).toBe(true);
    });

    it("emits events when admin clicks edit, delete or toggle buttons", async () => {
        const wrapper = mount(MemberRow, {
            props: {
                ...defaultProps,
                isAdmin: true,
            },
        });

        const editButton = wrapper.find('[data-testid="edit-button"]');
        await editButton.trigger("click");
        expect(wrapper.emitted().edit).toBeTruthy();
        expect(wrapper.emitted().edit[0]).toEqual([defaultProps.member]);

        const deleteButton = wrapper.find('[data-testid="delete-button"]');
        await deleteButton.trigger("click");
        expect(wrapper.emitted().delete).toBeTruthy();
        expect(wrapper.emitted().delete[0]).toEqual([defaultProps.member.id]);

        const toggleButton = wrapper.find('[data-testid="toggleVisibility-button"]');
        await toggleButton.trigger("click");
        expect(wrapper.emitted().toggle).toBeTruthy();
        expect(wrapper.emitted().toggle[0]).toEqual([defaultProps.member]);
    });
});
