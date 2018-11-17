export class Serializable {
    fromJSON(json) {
      if ( json === undefined ||
           json === null ||
           Object.keys(json).length === 0) {
        return null;
      }
  
      for (const propName in json) {
        if (json[propName]) {
          this[propName] = json[propName];
        }
      }
  
      return this;
    }
  }
  