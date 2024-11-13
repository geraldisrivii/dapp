export function setFiles(formData: FormData, files: FileList, names: string[]) {
  for (let index = 0; index < files.length; index++) {
    const extension = files[index].name.slice(
      files[index].name.lastIndexOf(".")
    );

    formData.append(
      "files",
      files[index],
      names[index] ? names[index] + extension : "TestFile" + extension
    );
  }
}
