import json
import network
import time
import urequests
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid = 'PoleDeVinci_Private'
password = 'Creatvive_Lab_2024'
wlan.connect(ssid, password)
url = f"https://little-nodejs-server.onrender.com/box"

led = Pin(28, Pin.OUT)
led2= Pin(27, Pin.OUT)
while not wlan.isconnected():
    print('noco')
    time.sleep(1)
old_led = led
led.toggle()
led.off()
led2.toggle()
led2.off()
while True:

    try:
        print("GET")

        r = urequests.get(url)

        response = r.json()
        print(response)
        print(response['box'])
        if response['box'] == "Leds":
            old_led.off()
            led.on()
            old_led= led
            time.sleep(1)
        elif response['box'] == "Résistances":
            old_led.off()
            led2.on()
            old_led= led2
            time.sleep(1)
        else:
            r.close()
    except Exception as e:
        print(e)


