int led = 3;
int sweep = 100;
int dir = 1;
char inChar;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
}

void loop() {
  
  if (inChar == 'c') {
      analogWrite(led, sweep); 
      sweep += dir;
      delay(2);
      if (sweep > 255 || sweep < 0) {
        dir *= -1;
        sweep += dir;
      } 
  } else if (inChar == 'd') {
      digitalWrite(led, HIGH); 
      delay(40);
      digitalWrite(led, LOW); 
      delay(40);
  }
}

void serialEvent() {
  if (Serial.available()) {
    inChar = (char)Serial.read();
    if (inChar == 'a') {  
      digitalWrite(led, HIGH); 
    } else if (inChar == 'b') {
      digitalWrite(led, LOW); 
    } 
  }
}


