import javax.microedition.midlet.MIDlet;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Form;
import javax.microedition.lcdui.Command;
import javax.microedition.lcdui.CommandListener;
import javax.microedition.lcdui.Displayable;
import javax.microedition.lcdui.StringItem;

public class HelloWorldMIDlet extends MIDlet implements CommandListener {
    private Display display;
    private Form form;
    private Command exitCommand;
    
    public HelloWorldMIDlet() {
        display = Display.getDisplay(this);
        form = new Form("Hello CloudFone");
        
        StringItem stringItem = new StringItem("", "Hello World from J2ME!\n\nThis is a test application for CloudFone platform.\n\nKeyboard test:\n- Use arrow keys to navigate\n- Press Enter to select\n- Press Escape to exit");
        form.append(stringItem);
        
        exitCommand = new Command("Exit", Command.EXIT, 1);
        form.addCommand(exitCommand);
        form.setCommandListener(this);
    }
    
    protected void startApp() {
        display.setCurrent(form);
    }
    
    protected void pauseApp() {
    }
    
    protected void destroyApp(boolean unconditional) {
    }
    
    public void commandAction(Command c, Displayable d) {
        if (c == exitCommand) {
            destroyApp(false);
            notifyDestroyed();
        }
    }
}