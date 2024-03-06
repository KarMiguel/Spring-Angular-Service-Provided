package io.github.KarMiguel.customers.rest.exception;

import lombok.experimental.StandardException;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserRegisterException extends RuntimeException{

    public UserRegisterException(String login){
        super("Usuario ja cadastrado com username " + login);

    }

}
