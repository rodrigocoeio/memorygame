const path = require("path");
const fs = require("fs");

const getExtensionFromFileName = function (fileName) {
  const fileNameSplited = fileName.split(".");

  return fileNameSplited.length > 1 ? fileNameSplited.pop() : false;
};

const removeExtensionFromFileName = function (fileName) {
  return fileName.split(".").slice(0, -1).join(".");
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatCardName = function (cardName) {
  const fileNameSplited = cardName.split("-");
  cardName = fileNameSplited.length > 1 ? fileNameSplited.pop() : fileNameSplited[0];

  cardName = cardName.trim();
  cardName = cardName.replace(/(\r\n|\n|\r)/gm, "");

  return capitalizeFirstLetter(cardName);
};

const readFolder = async function (folder, parent) {
  const contents = [];

  const directoryPath = path.join(__dirname, folder);
  const folderFiles = fs.readdirSync(directoryPath);

  folderFiles.forEach(async function (fullName) {
    const fullPath = folder + "/" + fullName;

    // Directory / Folder
    if (fs.lstatSync(fullPath).isDirectory()) {
      const parentFullName = parent ? parent + "/" + fullName : fullName;
      const folderContents = await readFolder(fullPath, parentFullName);
      const folder = {
        type: "folder",
        name: fullName,
        parent: parentFullName,
        fullPath: fullPath,
        contents: folderContents,
      };

      contents.push(folder);
    }

    // File
    else {
      const fileName = removeExtensionFromFileName(fullName);
      const fileExtension = getExtensionFromFileName(fullName);

      const file = {
        type: "file",
        name: fileName,
        parent: parent,
        extension: fileExtension,
        fileName: fullName,
        fullPath: fullPath,
      };

      contents.push(file);
    }
  });

  return contents;
};

const readCategories = async function (folder, callback) {
  const contents = await readFolder(folder);

  const categoriesCards = readContents(contents);
  callback(categoriesCards.categories);
};

const readContents = (contents, parent) => {
  let cover = false;
  let categories = {};
  let cards = [];

  contents.forEach((content) => {
    content = readContent(content, parent);

    switch (content.type) {
      case "category":
        categories[content.name] = content;
        break;

      case "cover":
        cover = content;
        break;

      case "card":
        cards.push(content);
        break;
    }
  });

  return { cover, categories, cards };
};

const readContent = (content, parent) => {
  switch (content.type) {
    case "folder":
      const category = getCategory(content, parent);
      const folderContents = readContents(content.contents, content);
      category.cover = folderContents.cover;
      category.categories = folderContents.categories;
      category.cards = folderContents.cards;

      return category;
    case "file":
      const card = getCard(content, parent);

      return card;
  }

  return false;
};

const getCategory = (content, parent) => {
  return {
    type: "category",
    name: content.name,
    cover: false,
    parent: parent ? parent.parent : "",
  };
};

const getCard = (content, parent) => {
  if (content.extension == "jpg" || content.extension == "png") {
    const cardName = formatCardName(content.name);
    const cardType = "card";
    const cardImage = content.fileName;
    const cardAudio = findCardFile(content.name, parent, "mp3") || findCardFile(content.name, parent, "mpeg");

    return {
      type: cardType,
      name: cardName,
      category: parent ? parent.name : '',
      parent: content.parent,
      image: cardImage,
      audio: cardAudio,
    };
  }

  return false;
};

const findCardFile = (name, parent, extension) => {
  let file = false;

  if (parent && parent.contents)
    parent.contents.forEach((content) => {
      if (content.name === name && content.extension === extension)
        file = content;
    });

  return file.fileName;
};

const categoriesFolder = "./public/cards";
const categoriesJsonPath = "./public/categories.json";

console.log("reading categories and cards...");

readCategories(categoriesFolder, function (categories) {
  fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories));
});
