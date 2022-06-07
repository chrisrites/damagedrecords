function stringifyDate(date) {
    let d = new Date(date)
    // .split and .slice are used to remove the Day (name) from the Date string
    return d.toDateString().split(' ').slice(1).join(' ')
}

export default stringifyDate