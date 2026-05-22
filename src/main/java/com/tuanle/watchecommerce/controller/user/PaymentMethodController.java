package com.tuanle.watchecommerce.controller.user;

import com.tuanle.watchecommerce.dto.PaymentMethodRequest;
import com.tuanle.watchecommerce.dto.PaymentMethodResponse;
import com.tuanle.watchecommerce.entity.PaymentMethod;
import com.tuanle.watchecommerce.entity.User;
import com.tuanle.watchecommerce.exception.ResourceNotFoundException;
import com.tuanle.watchecommerce.repository.PaymentMethodRepository;
import com.tuanle.watchecommerce.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    private final PaymentMethodRepository paymentMethodRepository;
    private final UserRepository userRepository;

    public PaymentMethodController(PaymentMethodRepository paymentMethodRepository, UserRepository userRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethodResponse>> getPaymentMethods(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        List<PaymentMethodResponse> list = paymentMethodRepository.findByUser(user).stream()
                .map(pm -> new PaymentMethodResponse(
                        pm.getId(),
                        pm.getCardHolderName(),
                        pm.getCardNumber(),
                        pm.getExpiryDate(),
                        pm.getCardType()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<PaymentMethodResponse> addPaymentMethod(Principal principal, @RequestBody PaymentMethodRequest request) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        PaymentMethod pm = new PaymentMethod(
                request.getCardHolderName(),
                request.getCardNumber(),
                request.getExpiryDate(),
                request.getCardType(),
                user
        );

        PaymentMethod saved = paymentMethodRepository.save(pm);

        PaymentMethodResponse response = new PaymentMethodResponse(
                saved.getId(),
                saved.getCardHolderName(),
                saved.getCardNumber(),
                saved.getExpiryDate(),
                saved.getCardType()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentMethod(Principal principal, @PathVariable Long id) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        PaymentMethod pm = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found"));

        // Security check: ensure the payment method belongs to the logged-in user
        if (!pm.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(430).build(); // 403 Forbidden
        }

        paymentMethodRepository.delete(pm);
        return ResponseEntity.noContent().build();
    }
}
