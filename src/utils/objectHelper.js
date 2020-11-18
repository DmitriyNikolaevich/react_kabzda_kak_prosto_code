export const updateObjectInArray = (items, itemID, objPropName, newObjProps) => {
    
    items.map(u => {
        if (u[objPropName] === itemID) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}