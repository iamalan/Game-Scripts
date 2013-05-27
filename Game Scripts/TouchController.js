#pragma strict

public var comfortZone : float = 70.0;
public var minSwipeDist : float = 2.0;
public var maxSwipeTime : float = 1.5;
public enum SwipeDirection {None, Up, Down, Left, Right}
public var lastSwipe = SwipeDirection.None; 
var playerPhysics : PlayerPhysics;
private var startPos : Vector2;
private var couldBeSwipe : boolean;
private var doOnce : boolean;

function Start(){
	doOnce = true;
}

function Update () {
	if (Input.touchCount > 0) {
        var touch : Touch = Input.touches[0];
        
        switch (touch.phase) {
        	case TouchPhase.Began:
        		lastSwipe = SwipeDirection.None;
				couldBeSwipe = true;
                startPos = touch.position;
        		break;
        		
        	case TouchPhase.Ended:
        		doOnce = true;
        		break;
        		
    		case TouchPhase.Moved:
                if (couldBeSwipe && doOnce) {      		
						if (startPos.x > touch.position.x && (Mathf.Abs(startPos.y-touch.position.y) < Mathf.Abs(startPos.x-touch.position.x))) {
                            lastSwipe = SwipeDirection.Left;
                            playerPhysics.MoveLeftOne();
						} else if (startPos.x < touch.position.x && (Mathf.Abs(startPos.y-touch.position.y) < Mathf.Abs(startPos.x-touch.position.x))) {
                            lastSwipe = SwipeDirection.Right;
                            playerPhysics.MoveRightOne();
						} else if (startPos.y < touch.position.y && (Mathf.Abs(startPos.x-touch.position.x) < Mathf.Abs(startPos.y-touch.position.y))) {
                            lastSwipe = SwipeDirection.Up;
                            playerPhysics.MoveUpOne();
						} else if (startPos.y > touch.position.y && (Mathf.Abs(startPos.x-touch.position.x) < Mathf.Abs(startPos.y-touch.position.y))) {
                            lastSwipe = SwipeDirection.Down;
                            playerPhysics.MoveDownOne();
						}
        	    	doOnce = false;	
        		}
        		
        		break;
        		
    	}

	}
}