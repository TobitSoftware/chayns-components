export const getGroupName = (key: string) => {
    const names: { [key: string]: string } = {
        person: 'Personen',
        site: 'Sites',
    };

    return names[key];
};
