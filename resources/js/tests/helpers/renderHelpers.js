export function renderComponentsCheck(names, wrapper){
    names.forEach((name) => {
        const component = wrapper.find(`[data-testid="${name}"]`);
        expect(component.exists()).toBe(true)
    })
}
