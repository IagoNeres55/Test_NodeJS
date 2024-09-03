import readlineSync from "readline-sync";
import fileManager from "./fileManager.js";
import url from "url";
import path from "path";

// fileManager.createDirectory(path.join('c:', 'DevNodeJs', 'TesteApiNode'));
// fileManager.createFile(path.join('c:', 'DevNodeJs', 'TesteApiNode', 'index.js'), 'console.log("Hello World")');

async function main() {

  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const baseDir = path.join(__dirname, "my_files");

  fileManager.createDirectory(baseDir);

  while (true) {
    console.log("___Menu___");
    console.log("1. Criar arquivo");
    console.log("2. Listar arquivos");
    console.log("3. Ler arquivo");
    console.log("4. Escrever arquivo");
    console.log("5. Deletar arquivo");
    console.log("6. Sair");

    const choice = readlineSync.question("Escolha uma opcao:");

    try {
      switch (choice) {
        case "1":
          const fileName = readlineSync.question("Digite o nome do arquivo:");
          const fileContent = readlineSync.question(
            "Digite o conteudo do arquivo:"
          );
          const createFilePath = path.join(baseDir, fileName); // C:\boot
          const fileManagers = await fileManager.createFile(
            createFilePath,
            fileContent
          );
          console.log(`Arquivo criado: ${fileManagers}`);
          break;
        case "2":
          const files = await fileManager.listFiles(baseDir);
          console.log("Arquivos no diretorio", files);
          break;
        case "3":
          const readFileName = readlineSync.question(
            "Digite o nome do arquivo:"
          );
          const readFilePath = path.join(baseDir, readFileName);
          const content = await fileManager.readFile(readFilePath);
          console.log("Conteúdo do arquivo:", content);
          break;
        case "4":
          const writeFileName = readlineSync.question(
            "Digite o nome do arquivo:"
          );
          const writeFilePath = path.join(baseDir, writeFileName);
          const contetn = readlineSync.question(
            "Digite o conteudo do arquivo:"
          );
          const message = await fileManager.writeFile(writeFilePath, contetn);

          console.log(message);
          break;
        case "5":
          const deleteFileName = readlineSync.question(
            "Digite o nome do arquivo a ser deletado:"
          );
          const deleteFilePath = path.join(baseDir, deleteFileName);
          await fileManager.deleteFile(deleteFilePath);
          console.log("Arquivo deletado");
          break;
        case "6":
          console.log("Saindo...");
          break;

        default:
          console.log("Opção inválida, tente novamente.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

main();
