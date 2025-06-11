export const initialVFS = {
  "Main.java": {
    content: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}`,
    visible: true,
    readOnly: false,
  },
  "GameLogic.java": {
    content: `// TODO: implement game logic`,
    visible: true,
    readOnly: false,
  },
  "GuiHelper.java": {
    content: `// GUI logic (hidden from user)`,
    visible: false,
    readOnly: true,
  },
};