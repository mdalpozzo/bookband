# bookband
An exchange for musical artists and venues


# API Routes

# USER ROUTES
@route   POST api/users/register_artist,

@desc    Registers an artist users,

@access  Public,

@route   POST api/users/register_host
@desc    Registers a host users
@access  Public

@route   POST api/users/artist_login
@desc    Login an artist user
@access  Public

@route   POST api/users/host_login
@desc    Login a host user
@access  Public

@route   GET api/users/current
@desc    Return current user
@access  Private

# PROFILE ROUTES
@route   GET api/profile
@desc    Get current users profile
@access  Private

@route   GET api/profile/artist/handle/:handle
@desc    Get artist profile by handle
@access  Public

@route   GET api/profile/host/handle/:handle
@desc    Get host profile by handle
@access  Public

@route   GET api/profile/artist/user/:user_id
@desc    Get artist profile by user ID
@access  Public

@route   GET api/profile/host/user/:user_id
@desc    Get host profile by user ID
@access  Public

@route   GET api/profile/artist/all
@desc    Get all artist profiles
@access  Public

@route   GET api/profile/host/all
@desc    Get all host profiles
@access  Public

@route   POST api/profile/
@desc    Create or edit user profile
@access  Private

@route   POST api/profile/video
@desc    Add video to profile
@access  Private

@route   DELETE api/profile/video/:video_id
@desc    Delete video from profile
@access  Private

@route   DELETE api/profile/
@desc    Delete user and profile
@access  Private

# REVIEW ROUTES
@route   GET api/reviews/profile/:profile_id
@desc    Gets all reviews by profile_id
@access  Public

@route   POST api/reviews
@desc    Create a review
@access  Private

@route   DELETE api/reviews/:id
@desc    Delete review
@access  Private