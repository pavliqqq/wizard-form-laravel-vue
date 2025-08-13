import * as requestHelpers from "../../helpers/request";
export function mockFormData(jestInstance) {
    const mockAppend = jest.fn();
    const fakeForm = { append: mockAppend };

    const formDataSpy = jestInstance
        .spyOn(requestHelpers, "createFormData")
        .mockReturnValue(fakeForm);

    return { mockAppend, fakeForm, formDataSpy };
}
