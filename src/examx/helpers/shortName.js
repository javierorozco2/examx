export const shortName = ( name = '', size = 0) => {
    return name?.length > size ? name.substring(0, size) + '...': name
}
