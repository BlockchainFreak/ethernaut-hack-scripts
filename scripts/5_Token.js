/* 

    This Challenge does not need scripting.
    Use Remix instead.

    The target contract does not take in account integer underflow.
    We will exploit it.
    if you are given 20 tokens in the start.
    make a transfer to someone else and input a value higher than 20.
    (for instance: value = 21)
    due to integer underflow (20 - 21) = (2^256 - 1);
*/
