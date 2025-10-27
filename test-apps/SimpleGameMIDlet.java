import javax.microedition.midlet.MIDlet;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Command;
import javax.microedition.lcdui.CommandListener;
import javax.microedition.lcdui.Displayable;

public class SimpleGameMIDlet extends MIDlet {
    private Display display;
    private GameCanvas gameCanvas;
    
    public SimpleGameMIDlet() {
        display = Display.getDisplay(this);
        gameCanvas = new GameCanvas();
    }
    
    protected void startApp() {
        display.setCurrent(gameCanvas);
        gameCanvas.start();
    }
    
    protected void pauseApp() {
        gameCanvas.stop();
    }
    
    protected void destroyApp(boolean unconditional) {
        gameCanvas.stop();
    }
    
    private class GameCanvas extends Canvas implements Runnable, CommandListener {
        private boolean running = false;
        private Thread gameThread;
        private int playerX = 50;
        private int playerY = 50;
        private Command exitCommand;
        private String lastKey = "None";
        
        public GameCanvas() {
            setFullScreenMode(true);
            exitCommand = new Command("Exit", Command.EXIT, 1);
            addCommand(exitCommand);
            setCommandListener(this);
        }
        
        public void start() {
            running = true;
            gameThread = new Thread(this);
            gameThread.start();
        }
        
        public void stop() {
            running = false;
            if (gameThread != null) {
                try {
                    gameThread.join();
                } catch (InterruptedException e) {
                }
            }
        }
        
        public void run() {
            while (running) {
                repaint();
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    break;
                }
            }
        }
        
        protected void paint(Graphics g) {
            // Clear screen
            g.setColor(0x000000);
            g.fillRect(0, 0, getWidth(), getHeight());
            
            // Draw title
            g.setColor(0xFFFFFF);
            g.drawString("CloudFone Game Test", 5, 5, Graphics.TOP | Graphics.LEFT);
            
            // Draw instructions
            g.drawString("Use arrow keys to move", 5, 25, Graphics.TOP | Graphics.LEFT);
            g.drawString("Press numbers 1-9", 5, 40, Graphics.TOP | Graphics.LEFT);
            g.drawString("Last key: " + lastKey, 5, 55, Graphics.TOP | Graphics.LEFT);
            
            // Draw player (red square)
            g.setColor(0xFF0000);
            g.fillRect(playerX, playerY, 10, 10);
            
            // Draw boundaries
            g.setColor(0x00FF00);
            g.drawRect(0, 70, getWidth()-1, getHeight()-71);
        }
        
        protected void keyPressed(int keyCode) {
            int action = getGameAction(keyCode);
            
            // Update last key pressed
            switch (keyCode) {
                case Canvas.KEY_NUM0: lastKey = "0"; break;
                case Canvas.KEY_NUM1: lastKey = "1"; break;
                case Canvas.KEY_NUM2: lastKey = "2"; break;
                case Canvas.KEY_NUM3: lastKey = "3"; break;
                case Canvas.KEY_NUM4: lastKey = "4"; break;
                case Canvas.KEY_NUM5: lastKey = "5"; break;
                case Canvas.KEY_NUM6: lastKey = "6"; break;
                case Canvas.KEY_NUM7: lastKey = "7"; break;
                case Canvas.KEY_NUM8: lastKey = "8"; break;
                case Canvas.KEY_NUM9: lastKey = "9"; break;
                case Canvas.KEY_STAR: lastKey = "*"; break;
                case Canvas.KEY_POUND: lastKey = "#"; break;
                default: 
                    switch (action) {
                        case Canvas.UP: lastKey = "UP"; break;
                        case Canvas.DOWN: lastKey = "DOWN"; break;
                        case Canvas.LEFT: lastKey = "LEFT"; break;
                        case Canvas.RIGHT: lastKey = "RIGHT"; break;
                        case Canvas.FIRE: lastKey = "FIRE"; break;
                        default: lastKey = "Key" + keyCode; break;
                    }
            }
            
            // Move player
            switch (action) {
                case Canvas.UP:
                    if (playerY > 75) playerY -= 5;
                    break;
                case Canvas.DOWN:
                    if (playerY < getHeight() - 15) playerY += 5;
                    break;
                case Canvas.LEFT:
                    if (playerX > 5) playerX -= 5;
                    break;
                case Canvas.RIGHT:
                    if (playerX < getWidth() - 15) playerX += 5;
                    break;
            }
            
            repaint();
        }
        
        public void commandAction(Command c, Displayable d) {
            if (c == exitCommand) {
                stop();
                SimpleGameMIDlet.this.destroyApp(false);
                SimpleGameMIDlet.this.notifyDestroyed();
            }
        }
    }
}