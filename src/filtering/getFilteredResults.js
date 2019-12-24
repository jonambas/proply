import matchSorter from 'match-sorter';

function propNameExists(props, matchName) {
  return props.map(({ name }) => name).includes(matchName);
}

function getFilteredResults(arr, id, value = {}) {
  const { filters, global } = value;

  // Run fuzzy matching first
  let filtered = matchSorter(arr, global, {
    keys: [
      'values.name',
      'values.location.fileName',
      item => item.values.props.length && item.values.props.map(i => i.name)
    ]
  });

  if (!filters.length) {
    return filtered;
  }

  filters.forEach(filter => {
    const { type, name: filterName, value: filterValue, matcher } = filter;

    if (!!filterName) {
      if (type === 'prop') {
        switch (matcher) {
          case 'equals':
            filtered = !!filterValue
              ? filtered.filter(({ values }) => {
                  return values.props.filter(
                    ({ name, value }) =>
                      name === filterName && value.toString() === filterValue
                  ).length;
                })
              : filtered;
            break;

          case 'includes':
            filtered = !!filterValue
              ? filtered.filter(({ values }) => {
                  return values.props.filter(
                    ({ name, value }) =>
                      name === filterName &&
                      value.toString().includes(filterValue)
                  ).length;
                })
              : filtered;
            break;

          case 'set':
            filtered = filtered.filter(({ values }) => {
              return propNameExists(values.props, filterName);
            });
            break;

          case 'notSet':
            filtered = filtered.filter(({ values }) => {
              return !propNameExists(values.props, filterName);
            });
            break;

          default:
            break;
        }
      }
      if (type === 'component') {
        switch (matcher) {
          case 'equals':
            filtered = filtered.filter(({ values }) => {
              return values.name === filterName;
            });
            break;
          case 'includes':
            filtered = filtered.filter(({ values }) => {
              return values.name.includes(filterName);
            });
            break;
          default:
            break;
        }
      }
    }
  });

  return filtered;
}

export default getFilteredResults;
