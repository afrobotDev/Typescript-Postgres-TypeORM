const { transformSync } = require("esbuild");
const { createHash } = require("node:crypto");

class EsbuildTransformer {
  process(sourceText, sourcePath) {
    const result = transformSync(sourceText, {
      loader: "ts",
      format: "cjs",
      target: "esnext",
      sourcefile: sourcePath,
      tsconfigRaw: JSON.stringify({
        compilerOptions: {
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
      }),
    });
    return { code: result.code };
  }

  getCacheKey(fileData, filePath) {
    return createHash("md5").update(fileData).update(filePath).digest("hex");
  }
}

module.exports = new EsbuildTransformer();
