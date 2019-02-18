export default function processRelations(type, relationsRaw) {
    const unrelated = [];
    const related = [];

    if(relationsRaw) {
        relationsRaw.forEach((relation) => {
            if (relation.score > 0) {
                related.push(relation);
            } else {
                unrelated.push(relation);
            }
        });
    }

    return { related, unrelated, type };
}
