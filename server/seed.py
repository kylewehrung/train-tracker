from random import randint, choice as rc
import random
from faker import Faker

from app import app
from models import db, Ticket, User, Train

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Ticket.query.delete()
    User.query.delete()
    Train.query.delete()

    print("Creating users...")

    users = []
    usernames = []
    names = ["Armani Caesar", "Westside Gunn", "Conway The Machine", "Benny the Butcher", "Rome Steetz", "Boldy James", "Stove God Cooks", "Mach-Hommy", "Jay Worthy", "Roc Marciano"]
    bars = [
        "Don't compare me to the rest, I'm different (Nah) Besides, you know eagles never rolled with pigeons",
        'Whip got the wings of angel kit I been wanting this shit my whole life, I didn\'t pray for it',
        'Everything happens for a reason, but I\'m just sayin\' what if, What if I never got shot in the head?',
        "You play this game, you better play it hard, The judge'll give you life and later that day, he gon' be playin' golf",
        "But realize the stove's hot 'til you analyze pain, Socialized with older guys that gave me wise game",
        "Dug down in my soul and did some soul searchin' (yeah), All I found was a police report for a missin' person (uh)",
        "Backstroke through the blood money and the crack smoke, Can't breathe, cryin' then them tears look like snowflakes on the jeans",
        "The sidewalks we walked was fraught wit peril, How awkward n' thorough, The K9 was barkin', hoggin' the marrow,",
        "I know they can't believe it, I'm bleedin' it, slidin', leanin' 'em, Gotta beat the odds, no surprise 'til we even it",
        "We was wearing Champion, but they never championed us, Outcast, I don't even give my family a hug, They say, 'Home is where the heart is', But where is your home when you heartless?",
    ]
    user_images = [
        'https://townsquare.media/site/812/files/2020/10/armani-caesar.jpg?w=980&q=75', 
        'https://images.genius.com/5b1839594ef95034df46963b631350a9.750x750x1.jpg', 
        'https://cdn.vox-cdn.com/thumbor/syo9rgkhPyQPwWQBhcCoW-VF3jY=/0x0:2560x1280/1200x800/filters:focal(1076x436:1484x844)/cdn.vox-cdn.com/uploads/chorus_image/image/67372198/conway_the_machine_tef_wesley.0.jpg', 
        'https://media.npr.org/assets/img/2021/03/08/btb-plugs-2-pic-3-61e372e825daab86ad54d8c457654868c17cfe51.jpeg?s=6', 
        'https://images.complex.com/complex/images/c_crop,h_2626,w_2000,x_0,y_219/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/fzy3hypk5gti8776dlgn/rome-streetz-press-1?fimg-ssr-default', 
        'https://hiphopcanada.com/wp-content/uploads/2020/09/boldy-james-1200w-2.jpg', 
        'https://static.hiphopdx.com/2020/03/200326-Stove-God-Cooks--800x600.jpg', 
        'https://images.genius.com/97f6cc6fae688cbbd4daf4563c0d9263.501x501x1.jpg', 
        'https://hiphophundred.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-16-at-8.13.53-PM.png', 
        'https://images.complex.com/complex/images/c_crop,h_735,w_1057,x_42,y_0/c_scale,w_1920/fl_lossy,pg_1,q_auto/cbabtm3hmahsnimyfxco/roc-marciano-profile-1', 
    ]
    for i in range(10):

        username = names[i]
        while username in usernames:
            username = names[i]
        usernames.append(username)

        user = User(
            username=username,
            bio=bars[i],
            image_url=user_images[i],
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating trains...")
    trains = []
    titles = ["The California Zephyr", "The Empire Builder", "The Southwest Chief", "The Coast Starlight", "The Acela Express"]
    train_images = [
        "https://i.pinimg.com/originals/f6/7b/c7/f67bc71e7c90cab10f8bb9837da2c6e1.png",
        "https://montanafreepress.org/wp-content/uploads/2022/02/20220213_AMT_Kootenai0023.jpeg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Southwest_Chief_at_Devil%27s_Throne%2C_New_Mexico_%28cropped%29.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nASehAHzvwriTcwBnjQdhqV-9He9pWLqdEKlazJUn60QZsnW_Bv_jI5mynus9ukqFU85PhZZ3t4&usqp=CAU&ec=48665698",
        "https://www.amtrak.com/content/dam/projects/dotcom/english/public/images/TextwithImage-Horizontal/acela-engine.jpg/_jcr_content/renditions/cq5dam.web.900.548.jpeg"
    ]
    descriptions = [
        "This train runs from Chicago to San Francisco, passing through some of the most scenic parts of the American West, including the Rocky Mountains and Sierra Nevada.",
        "This train travels from Chicago to Seattle or Portland, passing through the northern states of the US, including North Dakota, Montana, and Washington.",
        "This train runs from Chicago to Los Angeles, passing through the southwest region of the US, including New Mexico, Colorado, and Arizona.",
        "This train travels from Seattle to Los Angeles along the scenic Pacific coastline of the US, passing through cities like Portland and San Francisco.",
        "This train is the fastest in the US, running from Boston to Washington D.C. along the Northeast Corridor, with stops in cities like New York and Philadelphia."
    ]
    for i in range(5):
        train = Train(
            title=titles[i],
            description=descriptions[i],
            image_url=train_images[i],
        )
        trains.append(train)
    db.session.add_all(trains)

    print("Creating tickets...")


    available_users = list(users)
    available_trains = list(trains)

    tickets = []

    for _ in range(10):

        price = random.randrange(50, 201)
        price = (price // 5) * 5

        ticket = Ticket(
            price=price,
        )

        # Check if there are available users and trains
        if available_users and available_trains:
            user = rc(available_users)
            train = rc(available_trains)

            ticket.user = user
            ticket.train = train

            available_users.remove(user)  # Remove assigned user from the available list
            
        tickets.append(ticket)

    db.session.add_all(tickets)
    db.session.commit()
    print("Complete.")





