;; node node_modules/wabt/bin/wat2wasm factorial.wat -o factorial.wasm
(; 
   node node_modules/wabt/bin/wat2wasm factorial.wat -o factorial.wasm
;)

(module
  ;;; Calculates and returns the factorial of the first parameter using
  ;;; recursion.
  ;;; @param  {i32} $x
  ;;;         The value to calculate the factorial of.
  ;;; @return {i32}
  ;;;         The factorial of `$x`.

   (import "env" "consoleLog" (func $consoleLog (param i32)))

  (func $fact (param $x i32) (result i32)
    (local.get $x)
    (i32.const 1)
    (call $consoleLog (local.get $x))

    (if (result i32) (i32.le_s)
      ;; If `$x <= 1` then return `$x`.
      (then
        (local.get $x)
      )
      ;; Else, return `$x * fact($x - 1)`.
      (else
        (local.get $x)
        (i32.const 1)
        (i32.sub)

        (call $fact)
        (local.get $x)
        (i32.mul)
      )
    )
  )
            
  ;; Export the `fact` function so that it can be imported into another script.
  (export "fact" (func $fact))
)

(;
(module
  (func $fac
    (param $n i32)
    (result i32)
    local.get $n
    i32.const 2
    i32.le_s
    if (result i32)
      local.get $n
    else
      local.get $n
      local.get $n
      i32.const 1
      i32.sub
      call $fac
      i32.mul
    end)
  (func
    (export "main") 
    (result i32)
    i32.const 4
    call $fac (; 4! => 24 ;)))
;)