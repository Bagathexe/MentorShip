function BecomeMentor() {
    return ( <>
    
    <section class="mentor-form">
        <h2>Share your expertise and guide the next generation</h2>
        <form action="" method="post">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required />

            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required />

            <label for="expertise">Area of Expertise</label>
            <input type="text" id="expertise" name="expertise" required />

            <label for="bio">Short Bio</label>
            <textarea id="bio" name="bio" rows="4" required></textarea>

            <label for="linkedin">LinkedIn Profile</label>
            <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/your-profile" />

            <button type="submit">Become a Mentor</button>
        </form>
    </section>

    </> );
}

export default BecomeMentor;