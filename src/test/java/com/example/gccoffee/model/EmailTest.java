package com.example.gccoffee.model;

import org.junit.jupiter.api.Test;

public class EmailTest {

    @Test
    public void testInvalidEmail(){
        var email = new Email("accccc");
    }
}
