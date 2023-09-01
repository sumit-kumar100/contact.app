export const generateFilterQuery = (params: any) => {
  const serialize = (obj: any) => {
    const str = [];
    for (let key in obj)
      if (obj.hasOwnProperty(key)) {
        if (obj[key] || (key === "active" && obj[key] === false)) {
          str.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
          );
        }
      }
    return str.join("&");
  };

  return serialize(params);
};
