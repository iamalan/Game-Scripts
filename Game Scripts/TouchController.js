#pragma strict

public var comfortZone : float = 70.0;
public var minSwipeDist : float = 14.0;
public var maxSwipeTime : float = 0.5;
public enum SwipeDirection {None, Up, Down, Left, Right}
public var lastSwipe = SwipeDirection.None;
public var lastSwipeTime : float; 
var playerPhysics : PlayerPhysics;


private var startTime : float;
private var startPos : Vector2;
private var couldBeSwipe : boolean;


function Update () {
	if (Input.touchCount > 0) {
        var touch : Touch = Input.touches[0];
        
        switch (touch.phase) {
        	case TouchPhase.Began:
        		lastSwipe = SwipeDirection.None;
        		lastSwipeTime = 0;
				couldBeSwipe = true;
                startPos = touch.position;
                startTime = Time.time;
        		break;
        		
        	case TouchPhase.Moved:
        		//TODO: Add thresholds in here e.g. change couldbeswipe to false if under threshold etc
        		break;
        		
    		case TouchPhase.Ended:
                if (couldBeSwipe) {      		
        	    	var swipeTime : float = Time.time - startTime;
        	    	var swipeDist : float = (new Vector3(touch.position.x, touch.position.y, 0) - new Vector3(startPos.x, startPos.y, 0)).magnitude;
        	    	
        	    	if ((swipeTime < maxSwipeTime) && (swipeDist > minSwipeDist)) {
        	    		var swipeValueY : float = Mathf.Sign(touch.position.y - startPos.y);
						var swipeValueX : float = Mathf.Sign(touch.position.x - startPos.x);

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
        	    	}	
        		}
        		break;
        		
    	}

	}
}