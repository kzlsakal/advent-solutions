Code.compile_file("./utils/utils.exs")

defmodule Challenge do
  @moduledoc false

  def input do
    Utils.load_input(__ENV__.file)
  end

  def first_result do
    input()
    |> Enum.reduce([0, nil], fn val, [sum, prev] ->
      val = String.to_integer(val)

      if prev && prev < val, do: [sum + 1, val], else: [sum, val]
    end)
    |> List.first()
  end

  def second_result do
    input()
    |> Enum.reduce([0, nil, nil, nil], fn val, [sum, prev3, prev2, prev1] = acc ->
      val = String.to_integer(val)

      if Enum.all?(acc) && prev3 < val do
        [sum + 1, prev2, prev1, val]
      else
        [sum, prev2, prev1, val]
      end
    end)
    |> List.first()
  end
end

IO.inspect(Challenge.first_result(), label: "Q1")
IO.inspect(Challenge.second_result(), label: "Q2")
