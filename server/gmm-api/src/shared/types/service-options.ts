export type PathDef = { path: string; populate?: PathDef };


function flattenPathDef(pathDef: PathDef, prefix = ''): string[] {
    let paths: string[] = [];
    if (Array.isArray(pathDef)) {
      paths = pathDef;
    } else if (pathDef.path) {
      const fullPath = prefix ? `${prefix}.${pathDef.path}` : pathDef.path;
      paths.push(fullPath);
      if (pathDef.populate) {
        const subPaths = flattenPathDef(pathDef.populate, fullPath);
        paths = [...paths, ...subPaths];
      }
    }
    return paths;
  }
  