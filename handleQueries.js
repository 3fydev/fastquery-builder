export function transformFilter(col, value) {
  if (Array.isArray(value)) return `${col} IN (${value})`;
  return `${col} = ${value}`;
}

/**
 * @params {[{ col, value: Array | String |Number}]} list
 */
export function joinWhere(list) {
  return list.reduce((where, filter, index) => {
    if (index === 0) return `WHERE ${filter}`;
    return `${where} AND ${filter}`;
  }, '');
}

export function join(list) {
  return list.reduce((where, filter) => `${where} AND ${filter}`, '');
}

export function conditionalInArrayExists(col, value, not) {
  if (Array.isArray(value) && value.length > 0) {
    const commas = `'${value.join(`', '`)}'`;
    if (not) return `arrayExists(x -> in(x, (${commas})), ${col}) = 0`;
    return `arrayExists(x -> in(x, (${commas})), ${col}) = 1`;
  }
  return null;
}

export function conditionalWhereHasAny(col, value, not) {
  if (Array.isArray(value) && value.length > 0) {
    const commas = `'${value.join(`', '`)}'`;
    if (not) return `hasAny(${col}, [${commas}]) = 0`;
    return `hasAny(${col}, [${commas}]) = 1`;
  }
  return null;
}

export function conditionalWhereHasAll(col, value, not) {
  if (Array.isArray(value) && value.length > 0) {
    const commas = `'${value.join(`', '`)}'`;
    if (not) return `hasAll(${col}, [${commas}]) = 0`;
    return `hasAll(${col}, [${commas}]) = 1`;
  }
  return null;
}

export function conditionalWhereArrayAll(col, value, not) {
  if (Array.isArray(value) && value.length > 0) {
    const commas = `'${value.join(`', '`)}'`;
    if (not) return `arrayAll(${col}, [${commas}]) = 0`;
    return `arrayAll(${col}, [${commas}]) = 1`;
  }
  return null;
}

export function conditionalWhereEqual(col, value, not) {
  if (value || value === 0) {
    const fvalue = typeof value === 'string' ? `'${value}'` : value;
    if (not) return `${col} != ${fvalue}`;
    return `${col} = ${fvalue}`;
  }
  return null;
}

export function conditionalWhereOp(col, operator, value) {
  if (value || value === 0) {
    const fvalue = typeof value === 'string' ? `'${value}'` : value;
    return `${col} ${operator} ${fvalue}`;
  }
  return null;
}

export function conditionalWhereIN(col, value, not) {
  if (Array.isArray(value) && value.length > 0) {
    const commas = `'${value.join(`', '`)}'`;
    if (not) return `${col} NOT IN (${commas})`;
    return `${col} IN (${commas})`;
  }
  return null;
}

export function conditionalWhereBetween(col, value, not) {
  if (Array.isArray(value) && value.length === 2) {
    const [init, end] = value;
    if (not) return `${col} NOT BETWEEN ${init} AND ${end}`;
    return `${col} BETWEEN ${init} AND ${end}`;
  }
  return null;
}

export function conditionalWhereLike(col, value) {
  if (value && typeof value === 'string') {
    const fvalue = value.replace(/\s/g, '%');
    return `${col} LIKE '%${fvalue}%'`;
  }
  return null;
}

export function conditionalWhereCaseInsensitive(col, value) {
  if (value && typeof value === 'string') return `positionCaseInsensitive(${col}, '${value}') > 0`;

  return null;
}

export function conditionalWhereIsNot(col, value) {
  const fvalue = typeof value === 'string' ? `'${value}'` : value;
  return `${col} IS NOT ${fvalue}`;
}

export const conditionalWhere = {
  equal: conditionalWhereEqual,
  op: conditionalWhereOp,
  in: conditionalWhereIN,
  between: conditionalWhereBetween,
  like: conditionalWhereLike,
  caseInsensitive: conditionalWhereCaseInsensitive,
  inArrayExists: conditionalInArrayExists,
  isNot: conditionalWhereIsNot,
  hasAny: conditionalWhereHasAny,
  hasAll: conditionalWhereHasAll,
  arrayAll: conditionalWhereArrayAll,
};