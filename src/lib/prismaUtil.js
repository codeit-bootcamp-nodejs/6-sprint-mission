// getTags
export function getTags(tags) {
  if (!tags || tags.length === 0) {
    return undefined;
  }
  return {
    connectOrCreate: tags.map((tag) => ({
      where: { tag },
      create: { tag },
    })),
  };
}

// getImages
export function getImages(files) {
  if (!files || files.length === 0) {
    return undefined;
  }
  return {
    create: files.map((file) => ({ url: `/uploads/${file.filename}` })),
  };
}

// getFullName
export function getFullName(firstName, lastName) {
  if (!firstName || !lastName) {
    return undefined;
  }
  return lastName + firstName;
}
