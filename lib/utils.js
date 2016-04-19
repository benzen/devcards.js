import commonmark from "commonmark";

export const mapObj = (obj, fn) => {
  let dest = {}
  for(const key in obj) {
    dest[key] = fn(obj[key], key, obj)
  }
  return dest
}

export const groupBy = (list, prop) => {
  const groups = {}
  for(const entry of list){
    const value = entry[prop]
    groups[value] = groups[value] || []
    groups[value].push(entry)
  }
  return groups
}
export const sortBy = (list, prop) => {
  return list.sort((a, b) => a[prop] - b[prop])
}

const markdownHanlder = {
    reader: new commonmark.Parser(),
    writer: new commonmark.HtmlRenderer({
      safe: true
    })
};

export const markdownToHtml = (src) => {
  const parsed = markdownHanlder.reader.parse(src);
  return markdownHanlder.writer.render(parsed);
};

